"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";

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
      }
    ),
  email: z
    .string()
    .email({
      message: "Please provide a valid email address.",
    })
});

export function ListingLinkForm() {
  const [willSendEmail, setWillSendEmail] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
        {willSendEmail && <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email recipient..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                This is the email recipient for the PDF.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />}
        <div className="flex flex-row justify-center items-center">
          {willSendEmail ? (
            <Button type="submit">
              Send Email
            </Button>
          ) : (
            <Button onClick={() => setWillSendEmail(true)}>
              Email PDF
            </Button>
          ) }
          <a href={`/api/generate-invoice/${extractUuidFromUrl(form.getValues().url)}`} download>Download PDF</a>
        </div>
      </form>
    </Form>
  );
}

function extractUuidFromUrl(url: string): string {
  const regex = /(?:https?:\/\/)?(?:www\.)?withgarage\.com\/listing\/.*?-([a-f0-9\-]{36})/i;
  const match = url.match(regex);
  return match ? match[1] : '';
}