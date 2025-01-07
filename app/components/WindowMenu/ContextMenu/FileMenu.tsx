"use client";

import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
import { useAtom } from "jotai";
import {
  fileInfosAtom,
  filePathsAtom,
  isFocusedAtom,
  tabSelectedAtom,
  processedFilePathsSortedAtom,
  checkboxSelectedAtom,
  processedFilePathsAtom,
} from "@/app/lib/atom";
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
  },
];

export default function FileMenu() {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  const [isFocused, setIsFocused] = useAtom(isFocusedAtom);
  const fileButtonRef = useRef<HTMLButtonElement | null>(null);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePaths, setProcessedFilePaths] = useAtom(
    processedFilePathsAtom
  );

  function removeResult() {
    setProcessedFilePathsSorted([]);
    setCheckboxSelected([]);
    setProcessedFilePaths([]);
  }

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
      } else if (
        event.key === "d" &&
        event.ctrlKey &&
        isFocused &&
        tabSelected === "input" &&
        filePaths.length > 0
      ) {
        event.preventDefault();
        removeAll();
      } else if (
        event.key === "d" &&
        event.ctrlKey &&
        isFocused &&
        tabSelected === "output" &&
        processedFilePathsSorted.length > 0
      ) {
        event.preventDefault();
        removeResult();
      }
    };

    window.addEventListener("keydown", handleKeyDownFileShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownFileShortcut);
    };
  }, [isFocused, filePaths, tabSelected, processedFilePathsSorted]);

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
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePaths, setProcessedFilePaths] = useAtom(processedFilePathsAtom);

  function removeAll() {
    setFilePaths([]);
    setFileInfos([]);
  }
  function removeResult() {
    setProcessedFilePathsSorted([]);
    setCheckboxSelected([]);
    setProcessedFilePaths([]);
  }

  return (
    <button
      onClick={() => {
        if (tabSelected === "input") {
          removeAll();
        } else if (tabSelected === "output") {
          removeResult();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && tabSelected === "input") {
          removeAll();
        } else if (e.key === "Enter" && tabSelected === "output") {
          removeResult();
        }
      }}
      disabled={filePaths.length === 0 && tabSelected === "input" || processedFilePathsSorted.length === 0 && tabSelected === "output"}
      className={`flex items-center justify-between leading-5 ${
        filePaths.length === 0 && tabSelected === "input" ? "text-gray-300 cursor-not-allowed" : ""
      } ${
        processedFilePathsSorted.length === 0 && tabSelected === "output" ? "text-gray-300 cursor-not-allowed" : ""
      }`}
    >
      Remove All
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+D
      </span>
    </button>
  );
}
