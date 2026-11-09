import React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Input } from "./input";

type ListItemProps = React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
};

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: ListItemProps) => {
  return (
    <li {...props}>
      <NavigationMenuLink>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full flex justify-between items-center shadow p-3 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="flex flex-row gap-2">
        <div className="flex gap-1">
          <p className=" font-extrabold text-3xl text-purple-700">LayarMovie</p>
        </div>
        <div className="flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg">
                  Film
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px]">
                    <li>
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2">
                            Backlog
                          </Link>
                        }
                      />
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2">
                            To Do
                          </Link>
                        }
                      />
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2">
                            Done
                          </Link>
                        }
                      />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg">
                  Series
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px]">
                    <li>
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2">
                            Backlog
                          </Link>
                        }
                      />
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2">
                            To Do
                          </Link>
                        }
                      />
                      <NavigationMenuLink
                        render={
                          <Link
                            href="#"
                            className="flex-row items-center gap-2">
                            Done
                          </Link>
                        }
                      />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* <NavigationMenu>
          <NavigationMenuItem>
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px]">
                <li>
                  <NavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2">
                        Backlog
                      </Link>
                    }
                  />
                  <NavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2">
                        To Do
                      </Link>
                    }
                  />
                  <NavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2">
                        Done
                      </Link>
                    }
                  />
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu> */}
      </div>
      <div className="flex justify-center items-center">
        <Input placeholder="search" />
      </div>
    </div>
  );
};
