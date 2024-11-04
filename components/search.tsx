"use client"
import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search as SearchIcon, X } from "lucide-react"
import Link from "next/link"
import { allPrompts } from "content-collections"

export function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<typeof allPrompts>([])

    const handleSearch = useCallback(() => {
        const results = allPrompts.filter(prompt =>
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(results)
    }, [searchTerm])

    useEffect(() => {
        if (searchTerm) {
            handleSearch()
        } else {
            setSearchResults([])
        }
    }, [searchTerm, handleSearch])

    return (
        <div className="relative">
            <div className="flex items-center">
                <Input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 rounded-lg border-0 bg-[#202020] pl-4 pr-10 text-[#cecbc6] placeholder:text-[#cecbc6]/50 focus-visible:ring-0"
                />
                {searchTerm && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setSearchTerm("")}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
            {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg">
                    {searchResults.map((result) => (
                        <Link
                            key={result._meta.path}
                            href={`/${result._meta.path}`}
                            className="block px-4 py-2 hover:bg-muted"
                        >
                            {result.emoji} {result.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}