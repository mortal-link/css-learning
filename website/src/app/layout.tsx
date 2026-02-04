import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
