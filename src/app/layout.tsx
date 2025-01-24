import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./styles/globals.css";
import "@ryanbrandt/react-quick-ui/dist/stylesheets/index.scss";
import "@ryanbrandt/react-quick-ui/dist/stylesheets/colors.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
