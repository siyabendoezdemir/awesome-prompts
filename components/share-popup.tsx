"use client"
import * as React from "react"
import { useState, useEffect } from "react"
import { Twitter, Facebook, Linkedin, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

interface SharePopupProps {
  url: string
  title: string
}

export function SharePopup({ url, title }: SharePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: "You can now paste the link anywhere.",
      })
    }).catch((err) => {
      console.error('Failed to copy: ', err)
      toast({
        title: "Failed to copy link",
        description: "Please try again.",
        variant: "destructive",
      })
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Link className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this prompt</DialogTitle>
          <DialogDescription>
            Share this prompt with your friends or on social media.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              defaultValue={url}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            <Link className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <Button onClick={shareToTwitter} variant="outline" size="icon">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button onClick={shareToFacebook} variant="outline" size="icon">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button onClick={shareToLinkedIn} variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}