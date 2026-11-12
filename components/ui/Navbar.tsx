"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type MenuItem = { label: string; href: string };
type MenuGroup = { label: string; items: MenuItem[] };

// TODO: ganti href "#" dengan route kamu yang sebenarnya
const menus: MenuGroup[] = [
  {
    label: "Film",
    items: [
      { label: "Popular", href: "#" },
      { label: "Top Rating", href: "#" },
      { label: "Mendatang", href: "#" },
      { label: "Sedang Tayang", href: "#" },
    ],
  },
  {
    label: "Series",
    items: [
      { label: "Popular", href: "#" },
      { label: "Top Rating", href: "#" },
      { label: "Mendatang", href: "#" },
      { label: "Sedang Tayang", href: "#" },
    ],
  },
];

const SearchForm = ({
  className,
  onSubmitted,
}: {
  className?: string;
  onSubmitted?: () => void;
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onSubmitted?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari film atau series..."
        aria-label="Cari film atau series"
        className="pl-9"
      />
    </form>
  );
};

const MobileSection = ({
  menu,
  onNavigate,
}: {
  menu: MenuGroup;
  onNavigate: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between py-3 text-base font-medium">
        {menu.label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform",
            expanded && "rotate-180",
          )}
        />
      </button>

      {expanded && (
        <ul className="flex flex-col pb-2">
          {menu.items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // cek posisi saat pertama dimuat
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "fixed border-b border-white/10 bg-black/60 backdrop-blur-md"
          : "absolute bg-gradient-to-b from-black/60 to-transparent",
      )}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4">
        {/* kiri: logo + menu desktop */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-purple-500 md:text-3xl">
            LayarMovie
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.label}>
                  <NavigationMenuTrigger className="bg-transparent text-base">
                    {menu.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-2">
                      {menu.items.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink
                            render={
                              <Link
                                href={item.href}
                                className="flex-row items-center gap-2">
                                {item.label}
                              </Link>
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* kanan: search (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-2">
          <SearchForm className="hidden w-64 md:block lg:w-80" />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Buka menu"
            onClick={() => setOpen(true)}>
            <Menu className="size-6" />
          </Button>
        </div>
      </div>

      {/* panel menu mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle className="text-xl font-extrabold text-purple-500">
              LayarMovie
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 overflow-y-auto p-4">
            <SearchForm onSubmitted={() => setOpen(false)} />

            <nav className="flex flex-col">
              {menus.map((menu) => (
                <MobileSection
                  key={menu.label}
                  menu={menu}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
