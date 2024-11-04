import * as React from "react"
import { notFound } from "next/navigation"
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Star, Clock, Calendar, User, Share } from "lucide-react"
import { allPrompts } from "content-collections"
import { format, parseISO } from 'date-fns'
import { SidebarTrigger } from "@/components/ui/sidebar"

/* Custom Components */
import { Prompt } from "@/components/mdx/prompt"
import { headers } from "next/headers"
import { SharePopup } from "@/components/share-popup"

const components = {
    Prompt,
}

export default async function PromptPage({ params }: { params: { slug: string } }) {
    const prompt = allPrompts.find(p => p._meta.path === params.slug)

    if (!prompt) {
        notFound()
    }

    const createdDate = parseISO(prompt.created)

    // Get the current URL
    const headersList = headers()
    const host = headersList.get('host') || ''
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const currentUrl = `${protocol}://${host}/prompts/${params.slug}`

    return (
        <div className="flex flex-col h-screen">
            <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border">
                <div className="flex flex-1 items-center gap-2 px-4">
                    <SidebarTrigger />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-lg font-semibold">
                                    {prompt.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex items-center gap-2 px-4">
                    {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Star className="h-4 w-4" />
                    </Button> */}
                    <div className="flex items-center gap-2 px-4">
                        <SharePopup url={currentUrl} title={prompt.title} />
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto py-8 px-4">
                    <div className="rounded-lg shadow-sm">
                        <div className="px-8 py-6">
                            <h1 className="text-4xl font-bold mb-4 text-foreground">{prompt.title}</h1>
                            <div className="flex items-center text-sm mb-8 gap-4 text-muted-foreground">
                                <div className="flex">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>{prompt.author}</span>
                                </div>
                                <Separator orientation="vertical" className="mx-2 h-4" />
                                <div className="flex">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>{format(createdDate, 'MMMM d, yyyy')}</span>
                                </div>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <MDXRemote source={prompt.content} components={components} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}