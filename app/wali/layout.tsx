import { DM_Sans, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-wali-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-wali-serif",
});

export default function WaliLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${sans.variable} ${serif.variable} min-h-screen`}
      style={{
        background: "#F3EFE8",
        color: "#1A1A1A",
        fontFamily: "var(--font-wali-sans), sans-serif",
      }}
    >
      {children}
    </div>
  );
}
