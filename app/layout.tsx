"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import {
  getCurrentWindow,
  Window as TauriWindow,
} from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import WindowMenu from "./components/WindowMenu/WindowMenu";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [appWindow, setAppWindow] = useState<TauriWindow | null>(null);

  useEffect(() => {
    const fetchWindow = async () => {
      const window = await getCurrentWindow();
      setAppWindow(window);
    };

    fetchWindow();
  }, []);

  useEffect(() => {
    if (appWindow) {
      document
        .getElementById("titlebar-minimize")
        ?.addEventListener("click", () => appWindow.minimize());
      document
        .getElementById("titlebar-maximize")
        ?.addEventListener("click", () => appWindow.toggleMaximize());
      document
        .getElementById("titlebar-close")
        ?.addEventListener("click", () => appWindow.close());
    }
  }, [appWindow]);

  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <WindowMenu />
        <main>{children}</main>
      </body>
    </html>
  );
}
