import { Search } from "@/components/search";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#191919] text-[#cecbc6] relative">
      {/* SidebarTrigger */}
      <div className="absolute top-4 left-4 z-10">
        <SidebarTrigger className="text-[#cecbc6] hover:text-[#cecbc6]/80" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl space-y-8">
          {/* Header */}
          <h1 className="text-center text-2xl font-medium">
            What prompt do you need?
          </h1>

          {/* Input Field */}
          <div className="relative">
            <Search />
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[#cecbc6]/50">
            Made by <Link href={"https://x.com/siyabuilt"} target="_blank" className="hover:underline">@siyabuilt</Link>
          </p>
        </div>
      </div>
    </div>
  )
}