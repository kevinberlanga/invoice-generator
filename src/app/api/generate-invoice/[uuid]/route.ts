import { NextRequest, NextResponse } from "next/server";
import ReactPDF from "@react-pdf/renderer";
import React from "react";
import Invoice, { ItemData } from "./Invoice";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
): Promise<NextResponse> {
  const { uuid } = await params;
  console.log("uuid", uuid);
  const uuidRegex = /^[0-9a-fA-F-]{36}$/;
  if (!uuidRegex.test(uuid)) {
    return new NextResponse(JSON.stringify({ error: "Invalid UUID format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const itemData: ItemData = await fetch(
    `https://garage-backend.onrender.com/getListing`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuid,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log('listing data', data?.result?.listing);
      const {
        id,
        listingTitle,
        sellingPrice,
        itemBrand,
        listingDescription,
        itemAge,
        imageUrls,
        isAuction,
        addressPrimary,
        addressSecondary,
        addressCity,
        addressState,
        addressZip,
        mileage,
        hasServiceRecords,
        hasRust,
        tankSize,
        pumpSize,
        finalPrice,
        user,
      } = data?.result?.listing;
      return {
        user,
        listingId: id,
        listingTitle,
        sellingPrice,
        itemBrand,
        listingDescription,
        itemAge,
        isAuction,
        listingImage: imageUrls[0],
        dateRequested: new Date(),
        address: {
          primary: addressPrimary,
          secondary: addressSecondary,
          city: addressCity,
          state: addressState,
          zip: addressZip,
        },
        mileage,
        hasServiceRecords,
        hasRust,
        tankSize,
        pumpSize,
        finalPrice,
      };
    });

  const nodejsStream = await ReactPDF.renderToStream(
    React.createElement(Invoice, { data: itemData })
  );

  const newstream = new ReadableStream({
    start(controller) {
      nodejsStream.on('data', (chunk) => {
        controller.enqueue(chunk);
      });
      
      nodejsStream.on('end', () => {
        controller.close();
      });

      nodejsStream.on('error', (err) => {
        controller.error(err);
      });
    }
  });

  return new NextResponse(newstream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
      "Transfer-Encoding": "chunked",
    },
  });
}
