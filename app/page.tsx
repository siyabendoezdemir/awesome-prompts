import { Search } from "@/components/search";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#191919] px-4 text-[#cecbc6]">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <h1 className="text-center text-2xl font-medium">
          What prompt do you need?
        </h1>

        {/* Input Field */}
        <div className="relative">
          <Search />
        </div>

        {/* Action Buttons */}
        {/* <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="ghost"
            className="h-9 gap-2 rounded-lg bg-[#202020] px-4 text-sm font-normal text-[#cecbc6] hover:bg-[#202020]/80"
          >
            <Image className="h-4 w-4" />
            Erstelle ein Bild
          </Button>
          <Button
            variant="ghost"
            className="h-9 gap-2 rounded-lg bg-[#202020] px-4 text-sm font-normal text-[#cecbc6] hover:bg-[#202020]/80"
          >
            <Sparkles className="h-4 w-4" />
            Überrasche mich
          </Button>
          <Button
            variant="ghost"
            className="h-9 gap-2 rounded-lg bg-[#202020] px-4 text-sm font-normal text-[#cecbc6] hover:bg-[#202020]/80"
          >
            <PenLine className="h-4 w-4" />
            Hilf mir beim Schreiben
          </Button>
          <Button
            variant="ghost"
            className="h-9 gap-2 rounded-lg bg-[#202020] px-4 text-sm font-normal text-[#cecbc6] hover:bg-[#202020]/80"
          >
            <MoreHorizontal className="h-4 w-4" />
            Mehr
          </Button>
        </div> */}

        {/* Footer */}
        <p className="text-center text-xs text-[#cecbc6]/50">
          Made by <Link href={"https://x.com/siyabuilt"} target="_blank">@siyabuilt</Link>
        </p>
      </div>
    </div>
  )
}