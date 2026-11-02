"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SiteChromeProps = {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function SiteChrome({ navbar, footer, children }: SiteChromeProps) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/wali");

  return (
    <>
      {bare ? null : navbar}
      <main className="flex-1">{children}</main>
      {bare ? null : footer}
    </>
  );
}
