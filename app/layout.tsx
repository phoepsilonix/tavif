import { Roboto } from "next/font/google";
import "./globals.css";
import WindowMenu from "./components/WindowMenu/WindowMenu";
import type { Metadata } from "next";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tavif",
  description: "Tavif is a tool to convert images to avif format.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <WindowMenu />
        <main>{children}</main>
      </body>
    </html>
  );
}
