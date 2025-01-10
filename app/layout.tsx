import { Roboto } from "next/font/google";
import "./globals.css";
import WindowMenu from "./components/WindowMenu/WindowMenu";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
              colorPrimaryHover: "#6cd9ac",
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          <AntdRegistry>
            <WindowMenu />
            <main>{children}</main>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
