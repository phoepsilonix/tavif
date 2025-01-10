"use client";

import {
  getCurrentWindow,
  Window as TauriWindow,
} from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import FileMenu from "./ContextMenu/FileMenu";
import { useAtom } from "jotai";
import { isFocusedAtom } from "@/app/lib/atom";
import EditMenu from "./ContextMenu/SelectMenu";
import HelpMenu from "./ContextMenu/HelpMenu";
import { BorderOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";

export default function WindowMenu() {
  const [appWindow, setAppWindow] = useState<TauriWindow | null>(null);

  const [, setIsFocused] = useAtom(isFocusedAtom);

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

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
    <div
      data-tauri-drag-region
      className="titlebar bg-[#00b96b] h-[30px] flex justify-between items-center pl-2 gap-5 border-b border-gray-300"
    >
      <div className="flex items-center gap-2">
        <img src="/128x128.png" alt="logo" className="w-5 h-5" loading="lazy"/>
        <div className="flex items-center">
          <FileMenu />
          <EditMenu />
          <HelpMenu />
        </div>
      </div>
      <div className="flex">
        <div
          className="titlebar-button hover:bg-[#1adb8b] w-[40px] h-[30px] flex justify-center items-center cursor-pointer transition-colors duration-150"
          id="titlebar-minimize"
        >
          <MinusOutlined title="Minimize"/>
        </div>
        <div
          className="titlebar-button hover:bg-[#1adb8b] w-[40px] h-[30px] flex justify-center items-center cursor-pointer transition-colors duration-150"
          id="titlebar-maximize"
        >
          <BorderOutlined title="Maximize"/>
        </div>
        <div
          className="titlebar-button hover:bg-red-400 w-[40px] h-[30px] flex justify-center items-center cursor-pointer transition-colors duration-150"
          id="titlebar-close"
        >
          <CloseOutlined title="Close"/>
        </div>
      </div>
    </div>
  );
}
