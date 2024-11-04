import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MoreHorizontal, PenLine, Sparkles, Image, CornerDownLeft } from "lucide-react";
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
          <Input
            className="h-12 rounded-lg border-0 bg-[#202020] pl-4 pr-10 text-[#cecbc6] placeholder:text-[#cecbc6]/50 focus-visible:ring-0"
            placeholder="Search prompts in your library..."
            type="text"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-[#cecbc6]/50 hover:bg-transparent hover:text-[#cecbc6]"
          >
            <CornerDownLeft className="h-5 w-5" />
            <span className="sr-only">Search Prompts</span>
          </Button>
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