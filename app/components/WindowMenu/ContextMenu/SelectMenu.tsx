"use client";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useAtom } from "jotai";
import {
  checkboxSelectedAtom,
  isFocusedAtom,
  processedFilePathsSortedAtom,
  isProcessingAtom,
  isSavingAtom,
} from "@/app/lib/atom";
import { useEffect, useRef } from "react";
import "@ant-design/v5-patch-for-react-19";

const items: MenuProps["items"] = [
  {
    label: <SelectAll />,
    key: "0",
  },
];

export default function SelectMenu() {
  const [isFocused] = useAtom(isFocusedAtom);
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);
  const [isProcessing] = useAtom(isProcessingAtom);
  const [isSaving] = useAtom(isSavingAtom);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleKeyDownSelectShortcut = async (event: KeyboardEvent) => {
      if (
        event.key === "a" &&
        event.ctrlKey &&
        isFocused &&
        processedFilePathsSorted.length > 0
      ) {
        event.preventDefault();
        setCheckboxSelected((prev) =>
          prev.map((item) => ({
            ...item,
            checked: !item.checked,
          }))
        );
      } else if (event.key === "s" && event.altKey && isFocused) {
        event.preventDefault();
        selectButtonRef.current?.click();
        selectButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDownSelectShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownSelectShortcut);
    };
  }, [isFocused, checkboxSelected]);

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <button
        onClick={() => {}}
        ref={selectButtonRef}
        className={`bg-primary text-white border-none h-[98%] p-[2px_8px] text-sm tracking-wide hover:bg-[#84ddb8] rounded-md transition-all duration-200 ${
          isProcessing || isSaving ? "text-[#84ddb8] cursor-not-allowed" : ""
        }`}
      >
        Select(S)
      </button>
    </Dropdown>
  );
}

function SelectAll(): React.ReactNode {
  const [, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);
  return (
    <button
      title="Select all files."
      onClick={() =>
        setCheckboxSelected((prev) =>
          prev.map((item) => ({
            ...item,
            checked: !item.checked,
          }))
        )
      }
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setCheckboxSelected((prev) =>
            prev.map((item) => ({
              ...item,
              checked: !item.checked,
            }))
          );
        }
      }}
      disabled={processedFilePathsSorted.length === 0}
      className={`flex items-center justify-between leading-5 ${
        processedFilePathsSorted.length === 0
          ? "text-gray-300 cursor-not-allowed"
          : ""
      }`}
    >
      Select All
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+A
      </span>
    </button>
  );
}
