import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Sanmantec Inheritance Wallet",
  description: "Secure on-chain inheritance wallet powered by Klaytn & Sanmantec",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
