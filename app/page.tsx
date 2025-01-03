"use client";

import { ConfigProvider } from "antd";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";
import LoadingModal from "./components/LoadingModal/LoadingModal";
import InputTab from "./components/InputTab/InputTab";
import OutputTab from "./components/OutputTab/OutputTab";
import InputTabButton, { OutputTabButton } from "./components/TabButton/TabButton";

export default function Home() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <LoadingModal />
      <div className="flex w-screen h-screen">
        <div className="min-w-[230px] h-screen">
          <SettingsMenu />
        </div>
        <div className="flex-1 min-h-screen bg-gray-200 pt-[36px] relative">
          <InputTabButton />
          <OutputTabButton />
          <InputTab />
          <OutputTab />
        </div>
      </div>
    </ConfigProvider>
  );
}
