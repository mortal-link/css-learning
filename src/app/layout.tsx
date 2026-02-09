import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarToggle } from "@/components/SidebarToggle";
import { ExternalLink } from "lucide-react";
import { t } from "@/lib/i18n";
import { UI } from "@/lib/strings";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CSS Quest - 系统化学习 CSS",
  description: "基于 W3C 规范的 CSS 学习网站，理解原理而非死记规则",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system" defaultColorTheme="default">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-[90rem] flex h-14 items-center px-6 gap-4">
              <div className="xl:hidden">
                <SidebarToggle />
              </div>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">CSS</span>
                </div>
                <span className="font-semibold">{t(UI.appName)}</span>
              </Link>
              <div className="flex-1" />
              <nav className="flex items-center gap-4">
                <Link
                  href="https://www.w3.org/Style/CSS/"
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {t(UI.w3cSpec)} <ExternalLink className="w-3 h-3" />
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="min-h-[calc(100vh-3.5rem)]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
