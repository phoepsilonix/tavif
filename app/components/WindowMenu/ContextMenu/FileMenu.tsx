"use client";

import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
import { useAtom } from "jotai";
import { fileInfosAtom, filePathsAtom, isFocusedAtom } from "@/app/lib/atom";
import { openDialog } from "@/app/lib/utils";
import { useEffect, useRef } from "react";

const items: MenuProps["items"] = [
  {
    label: <FileOpen />,
    key: "0",
  },
  {
    label: <FileRemoveAll />,
    key: "1",
  }
];

export default function FileMenu() {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  const [isFocused, setIsFocused] = useAtom(isFocusedAtom);
  const fileButtonRef = useRef<HTMLButtonElement | null>(null);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);

  const removeAll = () => {
    setFilePaths([]);
    setFileInfos([]);
  };

  useEffect(() => {
    const handleKeyDownFileShortcut = async (event: KeyboardEvent) => {
      if (event.key === "o" && event.ctrlKey && isFocused) {
        event.preventDefault();
        await openDialog(setFilePaths, filePaths);
      } else if (event.key === "f" && event.altKey && isFocused) {
        event.preventDefault();
        fileButtonRef.current?.click();
        fileButtonRef.current?.focus();
      } else if (event.key === "d" && event.ctrlKey && isFocused) {
        event.preventDefault();
        if (filePaths.length > 0) {
          removeAll();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownFileShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownFileShortcut);
    };
  }, [isFocused, filePaths]);

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button
        ref={fileButtonRef}
        onClick={() => {}}
        className="px-2 text-white bg-[#00b96b] border-none h-[99%]"
      >
        File(F)
      </Button>
    </Dropdown>
  );
}

function FileOpen(): React.ReactNode {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  return (
    <button
      onClick={() => openDialog(setFilePaths, filePaths)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          openDialog(setFilePaths, filePaths);
        }
      }}
      className="flex items-center justify-between leading-5"
    >
      Add Files
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+O
      </span>
    </button>
  );
}

function FileRemoveAll(): React.ReactNode {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);
  const removeAll = () => {
    setFilePaths([]);
    setFileInfos([]);
  };
  return (
    <button
      onClick={removeAll}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          removeAll();
        }
      }}
      className="flex items-center justify-between leading-5"
    >
      Remove All
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+D
      </span>
    </button>
  );
}