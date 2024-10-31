"use client"

import Link from "next/link"
import { Users, Shield, CircleDollarSign } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const portals = [
  {
    title: "Customer Portal",
    href: "/auth?tab=customer",
    description: "Access your solar system dashboard and manage payments",
    icon: Users,
  },
  {
    title: "Agent Portal",
    href: "/auth?tab=agent",
    description: "Manage your sales and customer portfolio",
    icon: CircleDollarSign,
  },
  {
    title: "Admin Portal",
    href: "/auth?tab=admin",
    description: "Complete system administration and oversight",
    icon: Shield,
  },
  {
    title: "Super Admin",
    href: "/auth?tab=superAdmin",
    description: "Full system control and configuration",
    icon: Shield,
  },
]

export function PortalMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Access Portal
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {portals.map((portal) => (
                <li key={portal.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={portal.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        <portal.icon className="h-4 w-4" />
                        {portal.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {portal.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}