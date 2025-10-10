import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/components/contextProvider/AppProvider";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Market App",
  description: "Real-time stock market data and analysis",
  icons: {
    icon: "/logo.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body
        className={`${inter.className} antialiased bg-gray-900 min-h-screen w-full overflow-x-hidden`}
      >
        <div className="min-h-screen w-full flex flex-col">
          <UserProvider>
            {children}
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
