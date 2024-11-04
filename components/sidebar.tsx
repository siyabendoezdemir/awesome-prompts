"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Bell,
  Blocks,
  Calendar,
  ChevronDown,
  ChevronRight,
  Command,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LineChart,
  Link as LinkIcon,
  MessageCircleQuestion,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Star,
  StarOff,
  Trash,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { allPrompts } from "content-collections"

type Prompt = typeof allPrompts[number]

export function PromptLibrarySidebar() {
  const pathname = usePathname()
  const favorites = allPrompts.filter(prompt => !prompt._meta.path.includes('/'))
  const categories = allPrompts
    .filter(prompt => prompt._meta.path.includes('/'))
    .reduce((acc, prompt) => {
      const [category] = prompt._meta.path.split('/')
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(prompt)
      return acc
    }, {} as Record<string, Prompt[]>)

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader>
        <TeamSwitcher />
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={favorites} currentPath={pathname} />
        <NavCategories categories={categories} currentPath={pathname} />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

function NavFavorites({ favorites, currentPath }: { favorites: Prompt[], currentPath: string }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <SidebarMenu>
        {favorites.map((prompt) => (
          <SidebarMenuItem key={prompt._meta.path}>
            <SidebarMenuButton asChild isActive={currentPath === `/${prompt._meta.path}`}>
              <Link href={`/${prompt._meta.path}`} title={prompt.title}>
                <span>{prompt.emoji}</span>
                <span>{prompt.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavMain() {
  const items = [
    { title: "Home", url: "/", icon: Home, isActive: true },
  ]

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

function NavSecondary({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const items = [
   /*  { title: "Settings", url: "/settings", icon: Settings2 }, */
    { title: "Feedback", url: "mailto:me@siya.digital", icon: MessageCircleQuestion },
  ]

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function NavCategories({ categories, currentPath }: { categories: Record<string, Prompt[]>, currentPath: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Categories</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {Object.entries(categories).map(([category, prompts]) => (
            <Collapsible key={category}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span>{category}</span>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <SidebarMenuAction showOnHover>
                  <Plus />
                </SidebarMenuAction>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {prompts.map((prompt) => (
                      <SidebarMenuSubItem key={prompt._meta.path}>
                        <SidebarMenuSubButton asChild isActive={currentPath === `/${prompt._meta.path}`}>
                          <Link href={`/${prompt._meta.path}`}>
                            <span>{prompt.emoji}</span>
                            <span>{prompt.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function TeamSwitcher() {
  const teams = [
    { name: "My Library", logo: Command, plan: "Free" },
  ]

  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-3" />
              </div>
              <span className="truncate font-semibold">{activeTeam.name}</span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Switch Library
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Create new library</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}