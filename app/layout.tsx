"use client";
import "@ant-design/v5-patch-for-react-19";
import { Roboto } from "next/font/google";
import "./globals.css";
import WindowMenu from "./components/WindowMenu/WindowMenu";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#00b96b",
                colorPrimaryHover: "#6cd9ac",
                colorBgContainer: "#f6ffed",
              },
            }}
          >
            <WindowMenu />
            <main>{children}</main>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
