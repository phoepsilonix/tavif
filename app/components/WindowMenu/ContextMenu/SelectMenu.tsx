"use client";

import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
import { useAtom } from "jotai";
import { checkboxSelectedAtom, isFocusedAtom, processedFilePathsSortedAtom } from "@/app/lib/atom";
import { useEffect, useRef } from "react";

const items: MenuProps["items"] = [
  {
    label: <SelectAll />,
    key: "0",
  }
];

export default function SelectMenu() {
  const [isFocused, ] = useAtom(isFocusedAtom);
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePathsSorted, ] = useAtom(processedFilePathsSortedAtom);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleKeyDownSelectShortcut = async (event: KeyboardEvent) => {
      if (event.key === "a" && event.ctrlKey && isFocused && processedFilePathsSorted.length > 0) {
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
      <Button
        onClick={() => {}}
        className="px-2 text-white bg-[#00b96b] border-none h-[99%]"
        ref={selectButtonRef}
      >
        Select(S)
      </Button>
    </Dropdown>
  );
}

function SelectAll(): React.ReactNode {
  const [, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePathsSorted, ] = useAtom(processedFilePathsSortedAtom);
  return (
    <button
      title="Select all files."
      onClick={() => setCheckboxSelected((prev) =>
          prev.map((item) => ({
            ...item,
            checked: !item.checked,
          }))
        )}
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
      className={`flex items-center justify-between leading-5 ${processedFilePathsSorted.length === 0 ? "text-gray-300 cursor-not-allowed" : ""}`}
    >
      Select All
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+A
      </span>
    </button>
  );
}