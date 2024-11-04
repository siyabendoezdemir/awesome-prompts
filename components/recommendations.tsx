import * as React from "react"
import Link from "next/link"
import { allPrompts } from "content-collections"

interface RecommendationsProps {
    currentSlug: string
    limit?: number
}

export function Recommendations({ currentSlug, limit = 3 }: RecommendationsProps) {
    const recommendations = allPrompts
        .filter(prompt => prompt._meta.path !== currentSlug)
        .sort(() => 0.5 - Math.random())
        .slice(0, limit)

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">You might also like</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {recommendations.map((prompt) => (
                    <Link
                        key={prompt._meta.path}
                        href={`/${prompt._meta.path}`}
                        className="block p-4 bg-card rounded-lg hover:bg-muted transition-colors"
                    >
                        <h3 className="font-semibold mb-2">{prompt.title}</h3>
                        <p className="text-sm text-muted-foreground">{prompt.category}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}