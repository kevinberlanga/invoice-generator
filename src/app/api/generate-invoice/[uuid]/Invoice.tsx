import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  DocumentProps,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import sharp from "sharp";

export type ItemData = {
  listingId: string;
  user: {
    id: string;
    email: string;
  };
  listingTitle: string;
  sellingPrice: number;
  itemBrand: string;
  isAuction: boolean;
  listingDescription: string;
  itemAge: number;
  address: {
    primary: string;
    secondary: string;
    city: string;
    state: string;
    zip: string;
  };
  mileage: number;
  hasServiceRecords: boolean;
  hasRust: boolean;
  tankSize: number;
  pumpSize: number;
  finalPrice: number;
  listingImage: string;
  dateRequested: Date;
};

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    fontFamily: "Helvetica",
  },
  mainSection: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 10,
  },
  headerRight: {
    height: "43px",
    width: "180px",
    objectFit: "contain",
  },
  invoiceTable: {
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    width: "100%",
  },
  invoiceTableFooter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  invoiceTableFooterContent: {
    display: "flex",
    flexDirection: "column",
    width: 300,
  },
  footerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 25,
    borderTop: "1px solid lightgray",
  },
  footerAmountDueRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Helvetica-Bold",
    height: 25,
    borderTop: "1px solid lightgray",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    marginBottom: 5,
  },
  headerSecondSubtitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  invoiceText: {
    fontSize: 11,
  },
  invoiceTableDetailsSection: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  flexColumnContainer: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
    minWidth: 0,
  },
  invoiceTableDescriptionColumn: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 10,
  },
  invoiceTableQuantityColumn: {
    display: "flex",
    flexDirection: "column",
    width: 50,
    gap: 10,
  },
  invoiceTablePriceColumn: {
    display: "flex",
    flexDirection: "column",
    width: 100,
    gap: 10,
  },
  flexRowContainer: {
    display: "flex",
    flexDirection: "row",
  },
  columnHeaderCell: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    height: 30,
    borderBottom: "1px solid lightgray"
  },
  invoiceTableNumericalContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  invoiceTableListingImageContainer: {
    height: "100px",
    width: "100px",
    objectFit: "contain",
  },
  footer: {
    fontSize: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

// Create Document Component
const Invoice = ({ data, ...props }: { data: ItemData } & DocumentProps) => {
  const {
    user,
    // listingId,
    // isAuction,
    listingTitle,
    sellingPrice,
    listingImage,
    itemBrand,
    listingDescription,
    itemAge,
    address,
    mileage,
    hasServiceRecords,
    hasRust,
    tankSize,
    pumpSize,
    finalPrice,
  } = data;
  console.log(
    user,
    listingTitle,
    sellingPrice,
    itemBrand,
    listingDescription,
    itemAge,
    address,
    mileage,
    hasServiceRecords,
    hasRust,
    tankSize,
    pumpSize,
    finalPrice,
  );
  return (
    <Document {...props}>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Invoice</Text>
            <Text style={styles.headerSubtitle}>
              Date of Issue: {new Date().toLocaleDateString("en-US")}
            </Text>
            <View style={{ ...styles.flexColumnContainer, rowGap: 6 }}>
              <Text style={styles.headerSubtitle}>Seller</Text>
              {user?.email && (
                <View style={styles.flexColumnContainer}>
                  <Text style={styles.headerSecondSubtitle}>Email</Text>
                  <Text style={styles.invoiceText}>{user.email}</Text>
                </View>
              )}
              <View style={styles.flexColumnContainer}>
                <Text style={styles.headerSecondSubtitle}>Address</Text>
                {address.primary && address.primary !== "NA" && (
                  <Text style={styles.invoiceText}>{address.primary}</Text>
                )}
                {address.secondary && address.secondary !== "NA" && (
                  <Text style={styles.invoiceText}>{address.secondary}</Text>
                )}
                {(address.city || address.state || address.zip) && (
                  <Text style={styles.invoiceText}>
                    {address.city &&
                      address.city !== "NA" &&
                      `${address.city}, `}
                    {address.state &&
                      address.state !== "NA" &&
                      `${address.state} `}{" "}
                    {address.zip &&
                      address.zip !== "NA" &&
                      address.zip !== "00000" &&
                      address.zip}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Svg
              style={{
                width: 200,
                height: 43,
              }}
              viewBox="0 0 1714 445"
              fill="none"
            >
              <Path
                d="M114.816 439C85.0771 439 61.9904 433.131 45.5559 421.393C29.1214 409.655 17.7737 393.418 11.5129 372.68C5.25216 351.552 2.90436 327.098 4.46956 299.318C6.42605 271.538 10.7303 241.607 17.3824 209.523C31.8605 141.442 51.8167 89.5998 77.2511 53.9947C103.077 17.9982 138.294 0 182.902 0C229.075 0 260.183 13.4987 276.226 40.496C292.661 67.4933 296.965 107.794 289.139 161.397H191.706C195.228 137.139 196.01 119.532 194.054 108.576C192.097 97.6208 186.032 92.1431 175.858 92.1431C164.119 92.1431 154.141 102.316 145.924 122.662C138.098 142.616 129.685 174.113 120.685 217.152C115.99 240.237 112.077 261.757 108.946 281.711C105.816 301.275 105.229 317.121 107.185 329.25C109.533 341.379 116.185 347.444 127.142 347.444C135.359 347.444 142.402 343.336 148.272 335.119C154.533 326.902 159.815 312.621 164.119 292.275L166.467 278.777H138.294L154.728 200.132L282.096 200.719L260.966 299.318C254.314 332.576 243.749 359.573 229.271 380.31C214.793 400.656 197.771 415.524 178.206 424.914C158.641 434.305 137.511 439 114.816 439Z"
                fill="#F97315"
              />
              <Path
                d="M244.793 433.718L398.573 5.86898H544.136L521.832 433.718H420.29L426.746 363.29H368.639L346.335 433.718H244.793ZM394.464 281.124H433.79L444.942 185.46L453.746 103.294H449.637L424.399 184.286L394.464 281.124Z"
                fill="#F97315"
              />
              <Path
                d="M543.687 433.718L632.903 5.86898H749.118C790.596 5.86898 819.943 15.2593 837.16 34.0401C854.378 52.4296 862.595 76.6881 861.812 106.815C860.638 136.552 853.399 162.962 840.095 186.047C826.791 209.131 809.378 224.586 787.857 232.412L787.27 236.52C803.313 242.389 812.704 252.366 815.443 266.452C818.182 280.537 817.008 299.123 811.922 322.207L797.835 390.874C796.27 398.7 795.096 406.916 794.313 415.524C793.531 423.741 792.944 429.805 792.552 433.718H687.489C687.097 428.24 687.097 422.371 687.489 416.111C687.88 409.459 688.858 403.004 690.423 396.743L703.923 333.358C706.271 321.62 707.249 311.252 706.858 302.253C706.467 292.862 701.575 288.167 692.184 288.167H678.098L648.163 433.718H543.687ZM695.706 206.001H707.445C719.967 206.001 730.336 198.959 738.553 184.873C747.162 170.787 751.857 152.202 752.64 129.118C753.031 117.38 750.683 109.359 745.597 105.055C740.51 100.36 733.466 98.012 724.466 98.012H718.01L695.706 206.001Z"
                fill="#F97315"
              />
              <Path
                d="M811.679 433.718L965.459 5.86898H1111.02L1088.72 433.718H987.176L993.632 363.29H935.525L913.221 433.718H811.679ZM961.35 281.124H1000.68L1011.83 185.46L1020.63 103.294H1016.52L991.285 184.286L961.35 281.124Z"
                fill="#F97315"
              />
              <Path
                d="M1233.11 439C1203.37 439 1180.29 433.131 1163.85 421.393C1147.42 409.655 1136.07 393.418 1129.81 372.68C1123.55 351.552 1121.2 327.098 1122.77 299.318C1124.72 271.538 1129.03 241.607 1135.68 209.523C1150.16 141.442 1170.11 89.5998 1195.55 53.9947C1221.37 17.9982 1256.59 0 1301.2 0C1347.37 0 1378.48 13.4987 1394.52 40.496C1410.96 67.4933 1415.26 107.794 1407.44 161.397H1310C1313.52 137.139 1314.31 119.532 1312.35 108.576C1310.39 97.6208 1304.33 92.1431 1294.15 92.1431C1282.42 92.1431 1272.44 102.316 1264.22 122.662C1256.39 142.616 1247.98 174.113 1238.98 217.152C1234.29 240.237 1230.37 261.757 1227.24 281.711C1224.11 301.275 1223.52 317.121 1225.48 329.25C1227.83 341.379 1234.48 347.444 1245.44 347.444C1253.65 347.444 1260.7 343.336 1266.57 335.119C1272.83 326.902 1278.11 312.621 1282.42 292.275L1284.76 278.777H1256.59L1273.02 200.132L1400.39 200.719L1379.26 299.318C1372.61 332.576 1362.04 359.573 1347.57 380.31C1333.09 400.656 1316.07 415.524 1296.5 424.914C1276.94 434.305 1255.81 439 1233.11 439Z"
                fill="#F97315"
              />
              <Path
                d="M1382.27 433.718L1471.48 5.86898H1664L1645.8 98.012H1554.24L1538.98 172.548H1621.15L1602.96 258.235H1521.37L1503.76 341.575H1594.15L1575.37 433.718H1382.27Z"
                fill="#F97315"
              />
              <Path
                d="M41.0003 359V423M41.0003 423V439M41.0003 423L52.943 435M41.0003 423L29.0575 435M52.943 363L41.0003 375L29.0575 363M6.52473 379.002L20.315 387.002M20.315 387.002L61.6858 411.002M20.315 387.002L15.9437 370.609M20.315 387.002L4.00096 391.394M61.6858 411.002L75.4761 419.002M61.6858 411.002L78 406.609M61.6858 411.002L66.0573 427.394M75.4749 379.002L61.6847 387.002M61.6847 387.002L20.314 411.002M61.6847 387.002L66.0561 370.609M61.6847 387.002L77.9988 391.394M20.314 411.002L6.52378 419.002M20.314 411.002L4 406.609M20.314 411.002L15.9427 427.394"
                stroke="#7ED7FF"
                stroke-width="7"
                stroke-linecap="round"
              />
              <Path
                d="M1392 179V243M1392 243V259M1392 243L1403.94 255M1392 243L1380.06 255M1403.94 183L1392 195L1380.06 183M1357.52 199.002L1371.32 207.002M1371.32 207.002L1412.69 231.002M1371.32 207.002L1366.94 190.609M1371.32 207.002L1355 211.394M1412.69 231.002L1426.48 239.002M1412.69 231.002L1429 226.609M1412.69 231.002L1417.06 247.394M1426.47 199.002L1412.68 207.002M1412.68 207.002L1371.31 231.002M1412.68 207.002L1417.06 190.609M1412.68 207.002L1429 211.394M1371.31 231.002L1357.52 239.002M1371.31 231.002L1355 226.609M1371.31 231.002L1366.94 247.394"
                stroke="#7ED7FF"
                stroke-width="7"
                stroke-linecap="round"
              />
              <Path
                d="M1125 282V407.6M1125 407.6V439M1125 407.6L1148.56 431.15M1125 407.6L1101.44 431.15M1148.56 289.85L1125 313.4L1101.44 289.85M1056.98 321.253L1084.19 336.953M1084.19 336.953L1165.81 384.053M1084.19 336.953L1075.56 304.783M1084.19 336.953L1052 345.573M1165.81 384.053L1193.02 399.753M1165.81 384.053L1198 375.433M1165.81 384.053L1174.44 416.223M1193.02 321.253L1165.81 336.953M1165.81 336.953L1084.19 384.053M1165.81 336.953L1174.43 304.783M1165.81 336.953L1198 345.573M1084.19 384.053L1056.98 399.753M1084.19 384.053L1052 375.433M1084.19 384.053L1075.56 416.223"
                stroke="#7ED7FF"
                stroke-width="12"
                stroke-linecap="round"
              />
              <Path
                d="M325.001 141V266.6M325.001 266.6V298M325.001 266.6L348.563 290.15M325.001 266.6L301.438 290.15M348.563 148.85L325.001 172.4L301.438 148.85M256.981 180.253L284.189 195.953M284.189 195.953L365.813 243.053M284.189 195.953L275.565 163.783M284.189 195.953L252.002 204.573M365.813 243.053L393.02 258.753M365.813 243.053L398 234.433M365.813 243.053L374.437 275.223M393.018 180.253L365.81 195.953M365.81 195.953L284.187 243.053M365.81 195.953L374.435 163.783M365.81 195.953L397.998 204.573M284.187 243.053L256.979 258.753M284.187 243.053L252 234.433M284.187 243.053L275.563 275.223"
                stroke="#7ED7FF"
                stroke-width="12"
                stroke-linecap="round"
              />
              <Path
                d="M1618 28V180.8M1618 180.8V219M1618 180.8L1646.73 209.45M1618 180.8L1589.27 209.45M1646.73 37.55L1618 66.2L1589.27 37.55M1535.07 75.754L1568.24 94.854M1568.24 94.854L1667.76 152.154M1568.24 94.854L1557.73 55.7173M1568.24 94.854L1529 105.341M1667.76 152.154L1700.93 171.254M1667.76 152.154L1707 141.667M1667.76 152.154L1678.27 191.291M1700.93 75.754L1667.75 94.854M1667.75 94.854L1568.24 152.154M1667.75 94.854L1678.27 55.7173M1667.75 94.854L1707 105.341M1568.24 152.154L1535.07 171.254M1568.24 152.154L1529 141.667M1568.24 152.154L1557.73 191.291"
                stroke="#7ED7FF"
                stroke-width="13"
                stroke-linecap="round"
              />
              <Path
                d="M871 53V117M871 117V133M871 117L882.943 129M871 117L859.058 129M882.943 57L871 69L859.058 57M836.525 73.0017L850.315 81.0017M850.315 81.0017L891.686 105.002M850.315 81.0017L845.944 64.6094M850.315 81.0017L834.001 85.394M891.686 105.002L905.476 113.002M891.686 105.002L908 100.609M891.686 105.002L896.057 121.394M905.475 73.0017L891.685 81.0017M891.685 81.0017L850.314 105.002M891.685 81.0017L896.056 64.6094M891.685 81.0017L907.999 85.394M850.314 105.002L836.524 113.002M850.314 105.002L834 100.609M850.314 105.002L845.943 121.394"
                stroke="#7ED7FF"
                stroke-width="7"
                stroke-linecap="round"
              />
            </Svg>
          </View>
        </View>
        <View style={styles.mainSection}>
          <Text style={{ marginBottom: 10 }}>Invoice Details</Text>
          <View style={styles.invoiceTable}>
            <View style={styles.invoiceTableDetailsSection}>
              <View style={styles.invoiceTableDescriptionColumn}>
                <View
                  style={{
                    ...styles.columnHeaderCell,
                    alignItems: "flex-start",
                  }}
                >
                  <Text>Description</Text>
                </View>
                <View style={{ ...styles.flexRowContainer, columnGap: 10 }}>
                  <View style={styles.invoiceTableListingImageContainer}>
                    <Image
                      src={resize(listingImage, { width: 100, height: 100 })}
                    />
                  </View>
                  <View style={{ ...styles.flexColumnContainer, rowGap: 10 }}>
                    <Text style={{ fontFamily: "Helvetica-Bold" }}>
                      {listingTitle.length > 200
                        ? `${listingTitle.slice(0, 200)}...`
                        : listingTitle}
                    </Text>
                    <View style={{ ...styles.flexColumnContainer, rowGap: 6 }}>
                      <Text style={{ textDecoration: "underline" }}>
                        Seller description:
                      </Text>
                      <Text style={{ maxWidth: 350 }}>
                        {listingDescription.length > 400
                          ? `${listingDescription.slice(0, 400)}...`
                          : listingDescription}
                      </Text>
                    </View>
                    <View style={{ ...styles.flexColumnContainer, rowGap: 6 }}>
                      <Text style={{ textDecoration: "underline" }}>
                        Available Specifications:
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 6,
                        }}
                      >
                        {itemBrand && <Text>Brand: {itemBrand}</Text>}
                        {itemAge && <Text>Model year: {itemAge}</Text>}
                        {mileage && (
                          <Text>
                            Mileage: {Number(mileage).toLocaleString()} miles
                          </Text>
                        )}
                        {hasServiceRecords && (
                          <Text>
                            Service records available:{" "}
                            {hasServiceRecords ? "Yes" : "No"}
                          </Text>
                        )}
                        {hasRust && <Text>Rust: {hasRust ? "Yes" : "No"}</Text>}
                        {tankSize && <Text>Tank size: {tankSize}</Text>}
                        {pumpSize && <Text>Pump size: {pumpSize}</Text>}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.invoiceTableQuantityColumn}>
                <View
                  style={{ ...styles.columnHeaderCell, alignItems: "flex-end" }}
                >
                  <Text>Qty</Text>
                </View>
                <View style={styles.invoiceTableNumericalContent}>
                  <Text style={styles.invoiceText}>1</Text>
                </View>
              </View>
              <View style={styles.invoiceTablePriceColumn}>
                <View
                  style={{ ...styles.columnHeaderCell, alignItems: "flex-end" }}
                >
                  <Text>Unit Price</Text>
                </View>
                <View style={styles.invoiceTableNumericalContent}>
                  <Text style={styles.invoiceText}>
                    $
                    {sellingPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.invoiceTableFooter}>
              <View style={styles.invoiceTableFooterContent}>
                <View style={styles.footerRow}>
                  <Text>Subtotal:</Text>
                  <Text>
                    $
                    {sellingPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>
                <View style={styles.footerRow}>
                  <Text>Total:</Text>
                  <Text>
                    $
                    {sellingPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>
                <View style={styles.footerAmountDueRow}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>
                    Amount due:
                  </Text>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>
                    $
                    {sellingPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Sample Copy</Text>
          <Text>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;

function resize(
  url: string,
  { width, height }: { width: number; height: number },
): () => Promise<Buffer> {
  return async () => {
    const imageResponse = await fetch(
      url + "?width=3840&quality=75&resize=contain",
    );
    const imageBuffer = await imageResponse.arrayBuffer();
    return await sharp(Buffer.from(imageBuffer))
      // multiply size by 2 to support better visual rendering on retina displays
      .resize(width * 2, height * 2, {
        fit: "contain",
        position: "top",
        background: "white",
      })
      .toBuffer();
  };
}
