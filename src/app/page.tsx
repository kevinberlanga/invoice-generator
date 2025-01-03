import { ListingLinkForm } from "@/components/ListingLinkForm";
import Image from "next/image";

export default function Home() {
  // const handleClick = () => {
  //   fetch()
  // }
  return (
    <div className="flex flex-col h-full w-full justify-center items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <main className="flex flex-col w-full gap-8 items-center">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Garage logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex flex-col items-center w-96 gap-4">
          <h1 className="font-bold text-2xl">Generate Listing Invoice</h1>
          <ListingLinkForm />
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center">
        <a href="https://www.withgarage.com/search">Browse Listings</a>
      </footer>
    </div>
  );
}
