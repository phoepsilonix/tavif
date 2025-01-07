"use client";

import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
import { useAtom } from "jotai";
import { checkboxSelectedAtom, isFocusedAtom, processedFilePathsSortedAtom } from "@/app/lib/atom";
import { useEffect, useRef } from "react";

const items: MenuProps["items"] = [
  {
    label: <CheckAll />,
    key: "0",
  }
];

export default function EditMenu() {
  const [isFocused, setIsFocused] = useAtom(isFocusedAtom);
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);
  const editButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handleKeyDownEditShortcut = async (event: KeyboardEvent) => {
      if (event.key === "a" && event.ctrlKey && isFocused && processedFilePathsSorted.length > 0) {
        event.preventDefault();
        setCheckboxSelected((prev) =>
          prev.map((item) => ({
            ...item,
            checked: !item.checked,
          }))
        );
      } else if (event.key === "e" && event.altKey && isFocused) {
        event.preventDefault();
        editButtonRef.current?.click();
        editButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDownEditShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEditShortcut);
    };
  }, [isFocused, checkboxSelected]);

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button
        onClick={() => {}}
        className="px-2 text-white bg-[#00b96b] border-none h-[99%]"
        ref={editButtonRef}
      >
        Edit(E)
      </Button>
    </Dropdown>
  );
}

function CheckAll(): React.ReactNode {
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);
  return (
    <button
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
      Check All
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+A
      </span>
    </button>
  );
}