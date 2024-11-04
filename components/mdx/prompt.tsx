"use client"

import * as React from "react"
import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PromptDisplayProps {
  content: string
  className?: string
}

export function Prompt({ content, className }: PromptDisplayProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className={cn("relative rounded-md bg-muted", className)}>
      <pre className="overflow-x-auto p-4 text-sm bg-muted">
        <code>{content}</code>
      </pre>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-2"
        onClick={copyToClipboard}
        aria-label={isCopied ? "Copied" : "Copy to clipboard"}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}