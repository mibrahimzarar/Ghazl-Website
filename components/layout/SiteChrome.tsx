"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type SiteChromeProps = {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function SiteChrome({ navbar, footer, children }: SiteChromeProps) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/wali");

  useEffect(() => {
    if (!bare) return;
    document.body.classList.add("wali-portal");
    return () => {
      document.body.classList.remove("wali-portal");
    };
  }, [bare]);

  return (
    <>
      {bare ? null : navbar}
      <main className="flex-1">{children}</main>
      {bare ? null : footer}
    </>
  );
}
