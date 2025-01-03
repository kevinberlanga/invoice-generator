"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  url: z
    .string()
    .nonempty({
      message: "Please provide a url.",
    })
    .url({
      message: "Please provide a valid url.",
    })
    .startsWith("https://www.withgarage.com/listing/", {
      message: "Please provide a valid withgarage.com url.",
    })
    .regex(
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      {
        message: "Please provide a valid listing url.",
      },
    ),
});

export function ListingLinkForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = () => {
    const uuid = extractUuidFromUrl(form.getValues().url);
    const href = `/api/generate-invoice/${uuid}`;

    // download as invoice.pdf
    const a = document.createElement("a");
    a.href = href;
    a.download = `invoice-${uuid}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter listing url..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                This is the full URL for a product listing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-center items-center">
          <Button disabled={!!form.formState.errors.url} type="submit">
            Request PDF Invoice
          </Button>
        </div>
      </form>
    </Form>
  );
}

function extractUuidFromUrl(url: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?withgarage\.com\/listing\/.*?-([a-f0-9\-]{36})/i;
  const match = url.match(regex);
  if (match) console.log("match", match[1]);
  return match ? match[1] : "";
}
