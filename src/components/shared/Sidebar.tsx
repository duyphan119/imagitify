"use client";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  const renderNavLinks = (items: typeof navLinks) =>
    items.map((navLink) => {
      const isActive = pathname === navLink.route;
      return (
        <li
          className={cn(
            "sidebar-nav_element group",
            isActive ? "bg-purple-gradient text-white" : "text-gray-700"
          )}
          key={navLink.label}
        >
          <Link href={navLink.route} className="sidebar-link">
            <Image
              src={navLink.icon}
              alt="icon"
              width={24}
              height={24}
              className={cn(isActive ? "brightness-200" : "")}
            />
            {navLink.label}
          </Link>
        </li>
      );
    });

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {renderNavLinks(navLinks.slice(0, 6))}
            </ul>
            <ul className="sidebar-nav_elements">
              {renderNavLinks(navLinks.slice(6))}
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
}
