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
  isSavingAtom,
} from "@/app/lib/atom";
import { openDialog, saveAll, saveSelected } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";

const items: MenuProps["items"] = [
  {
    label: <FileOpen />,
    key: "0",
  },
  {
    label: <FileRemoveAll />,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: <FileSaveAll />,
    key: "2",
  },
  {
    label: <FileSaveSelected />,
    key: "3",
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
  const [isSaving, setIsSaving] = useAtom(isSavingAtom);
  const modal = Modal.useModal();

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
      } else if (
        event.key === "s" &&
        event.ctrlKey &&
        isFocused &&
        processedFilePathsSorted.length > 0
      ) {
        event.preventDefault();
        saveAll(setIsSaving, processedFilePathsSorted, modal);
      } else if (
        event.key === "s" &&
        event.ctrlKey &&
        event.altKey &&
        isFocused &&
        processedFilePathsSorted.length > 0
      ) {
        event.preventDefault();
        saveSelected(setIsSaving, processedFilePathsSorted, checkboxSelected, modal);
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
      title="Add files."
      onClick={() => openDialog(setFilePaths, filePaths)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          openDialog(setFilePaths, filePaths);
        }
      }}
      className="flex items-center justify-between leading-5 w-full"
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
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [processedFilePaths, setProcessedFilePaths] = useAtom(
    processedFilePathsAtom
  );

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
      title="Remove all files."
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
      disabled={
        (filePaths.length === 0 && tabSelected === "input") ||
        (processedFilePathsSorted.length === 0 && tabSelected === "output")
      }
      className={`flex items-center justify-between leading-5 ${
        filePaths.length === 0 && tabSelected === "input"
          ? "text-gray-300 cursor-not-allowed"
          : ""
      } ${
        processedFilePathsSorted.length === 0 && tabSelected === "output"
          ? "text-gray-300 cursor-not-allowed"
          : ""
      }`}
    >
      Remove All
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+D
      </span>
    </button>
  );
}

function FileSaveAll(): React.ReactNode {
  const [isSaving, setIsSaving] = useState(false);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [modal, modalContextHolder] = Modal.useModal();
  return (
    <button
      className={`flex items-center justify-between leading-5 w-full ${
        isSaving || processedFilePathsSorted.length === 0
          ? "text-gray-300 cursor-not-allowed"
          : ""
      }`}
      onClick={() => saveAll(setIsSaving, processedFilePathsSorted, modal)}
      disabled={isSaving || processedFilePathsSorted.length === 0}
      title="Save all files."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          saveAll(setIsSaving, processedFilePathsSorted, modal);
        }
      }}
    >
      Save All
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+S
      </span>
    </button>
  );
}


function FileSaveSelected(): React.ReactNode {
  const [isSaving, setIsSaving] = useState(false);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [modal, modalContextHolder] = Modal.useModal();
  return (
    <button
      className={`flex items-center justify-between leading-5 w-full ${
        isSaving || processedFilePathsSorted.length === 0
          ? "text-gray-300 cursor-not-allowed"
          : ""
      }`}
      onClick={() => saveSelected(setIsSaving, processedFilePathsSorted, checkboxSelected, modal)}
      disabled={isSaving || processedFilePathsSorted.length === 0}
      title="Save selected files."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          saveSelected(setIsSaving, processedFilePathsSorted, checkboxSelected, modal);
        }
      }}
    >
      Save Selected
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+Alt+S
      </span>
    </button>
  );
}