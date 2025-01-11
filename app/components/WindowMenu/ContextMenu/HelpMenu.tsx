"use client";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useAtom } from "jotai";
import {
  isFocusedAtom,
  isLicenseDialogOpenAtom,
  isProcessingAtom,
  isSavingAtom,
} from "@/app/lib/atom";
import { useEffect, useRef } from "react";
import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";

const items: MenuProps["items"] = [
  {
    label: <Help />,
    key: "0",
  },
];

export default function HelpMenu() {
  const [isFocused] = useAtom(isFocusedAtom);
  const [isProcessing] = useAtom(isProcessingAtom);
  const [isSaving] = useAtom(isSavingAtom);
  const helpButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleKeyDownSelectShortcut = async (event: KeyboardEvent) => {
      if (event.key === "h" && event.altKey && isFocused) {
        event.preventDefault();
        helpButtonRef.current?.click();
        helpButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDownSelectShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownSelectShortcut);
    };
  }, [isFocused]);

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <button
        onClick={() => {}}
        className={`bg-primary text-white border-none h-[98%] p-[2px_8px] text-sm tracking-wide hover:bg-[#84ddb8] rounded-md transition-all duration-200 ${
          isProcessing || isSaving ? "text-[#84ddb8] cursor-not-allowed" : ""
        }`}
        ref={helpButtonRef}
      >
        Help(H)
      </button>
    </Dropdown>
  );
}

function Help(): React.ReactNode {
  const [, setIsLicenseDialogOpen] = useAtom(isLicenseDialogOpenAtom);
  return (
    <>
      <button
        onClick={() => {
          setIsLicenseDialogOpen(true);
        }}
      >
        Show License
      </button>
    </>
  );
}
