"use client";

import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useAtom } from "jotai";
import {
  fileInfosAtom,
  filePathsAtom,
  isFocusedAtom,
  tabSelectedAtom,
  qualityAtom,
  extensionTypeAtom,
  processedFilePathsSortedAtom,
  checkboxSelectedAtom,
  processedFilePathsAtom,
  isSavingAtom,
  isProcessingAtom,
  windowMenuDialogAtom,
} from "@/app/lib/atom";
import { convert, openDialog, saveAll, saveSelected } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import "@ant-design/v5-patch-for-react-19";

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
  {
    type: "divider",
  },
  {
    label: <FileConvert />,
    key: "4",
  },
];

export default function FileMenu() {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  const [isFocused] = useAtom(isFocusedAtom);
  const fileButtonRef = useRef<HTMLButtonElement | null>(null);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [, setProcessedFilePaths] = useAtom(processedFilePathsAtom);
  const [isSaving, setIsSaving] = useAtom(isSavingAtom);
  const [quality] = useAtom(qualityAtom);
  const [extensionType] = useAtom(extensionTypeAtom);
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [, setDialog] = useAtom(windowMenuDialogAtom);

  const handleConvert = async () => {
    const result = await convert(setIsProcessing, filePaths, quality, extensionType, fileInfos, setProcessedFilePaths, setTabSelected, setDialog);
    if (result) {
      setDialog(result);
    }
  };

  const handleSaveAll = async () => {
    const result = await saveAll(setIsSaving, processedFilePathsSorted, setDialog);
    if (result) {
      setDialog(result);
    }
  };

  const handleSaveSelected = async () => {
    const result = await saveSelected(setIsSaving, processedFilePathsSorted, checkboxSelected, setDialog);
    if (result) {
      setDialog(result);
    }
  };
  
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
        handleSaveAll();
      } else if (
        event.key === "s" &&
        event.ctrlKey &&
        event.altKey &&
        isFocused &&
        processedFilePathsSorted.length > 0
      ) {
        event.preventDefault();
        handleSaveSelected();
      } else if (
        event.key === "Enter" &&
        isFocused &&
        filePaths.length > 0 &&
        !isProcessing
      ) {
        event.preventDefault();
        handleConvert();
      }
    };

    window.addEventListener("keydown", handleKeyDownFileShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownFileShortcut);
    };
  }, [isFocused, filePaths, tabSelected, processedFilePathsSorted]);

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <button
          ref={fileButtonRef}
          title="File menu"
          disabled={isProcessing || isSaving}
          onClick={() => {}}
          className={`bg-primary text-white border-none h-[98%] p-[2px_8px] text-sm tracking-wide hover:bg-[#84ddb8] rounded-md transition-all duration-200 ${
            isProcessing || isSaving ? "text-[#84ddb8] cursor-not-allowed" : ""
          }`}
        >
          File(F)
        </button>
      </Dropdown>
    </>
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
  const [tabSelected] = useAtom(tabSelectedAtom);
  const [, setFileInfos] = useAtom(fileInfosAtom);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [, setProcessedFilePaths] = useAtom(processedFilePathsAtom);

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
      className={`flex items-center justify-between leading-5 w-full ${
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
  const [processedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);
  const [, setDialog] = useAtom(windowMenuDialogAtom);
  const handleSaveAll = async () => {
    const result = await saveAll(setIsSaving, processedFilePathsSorted, setDialog);
    if (result) {
      setDialog(result);
    }
  };
  return (
    <>
      <button
        className={`flex items-center justify-between leading-5 w-full ${
          isSaving || processedFilePathsSorted.length === 0
            ? "text-gray-300 cursor-not-allowed"
            : ""
        }`}
        onClick={handleSaveAll}
        disabled={isSaving || processedFilePathsSorted.length === 0}
        title="Save all files."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSaveAll();
          }
        }}
      >
        Save All
        <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
          Ctrl+S
        </span>
      </button>
    </>
  );
}

function FileSaveSelected(): React.ReactNode {
  const [isSaving, setIsSaving] = useState(false);
  const [processedFilePathsSorted] = useAtom(processedFilePathsSortedAtom);
  const [checkboxSelected] = useAtom(checkboxSelectedAtom);
  const [, setDialog] = useAtom(windowMenuDialogAtom);
  const handleSaveSelected = async () => {
    const result = await saveSelected(setIsSaving, processedFilePathsSorted, checkboxSelected, setDialog);
    if (result) {
      setDialog(result);
    }
  };
  return (
    <>
      <button
        className={`flex items-center justify-between leading-5 w-full ${
          isSaving || processedFilePathsSorted.length === 0
            ? "text-gray-300 cursor-not-allowed"
            : ""
        }`}
        onClick={handleSaveSelected}
        disabled={isSaving || processedFilePathsSorted.length === 0}
        title="Save selected files."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSaveSelected();
          }
        }}
      >
        Save Selected
        <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
          Ctrl+Alt+S
        </span>
      </button>
    </>
  );
}

function FileConvert(): React.ReactNode {
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [, setProcessedFilePaths] = useAtom(processedFilePathsAtom);
  const [, setDialog] = useAtom(windowMenuDialogAtom);
  const [filePaths] = useAtom(filePathsAtom);
  const [fileInfos] = useAtom(fileInfosAtom);
  const [quality] = useAtom(qualityAtom);
  const [extensionType] = useAtom(extensionTypeAtom);
  const [, setTabSelected] = useAtom(tabSelectedAtom);
  const handleConvert = async () => {
    const result = await convert(setIsProcessing, filePaths, quality, extensionType, fileInfos, setProcessedFilePaths, setTabSelected, setDialog);
    if (result) {
      setDialog(result);
    }
  };
  return (
    <>
      <button
        className={`flex items-center justify-between leading-5 w-full ${
          isProcessing || filePaths.length === 0
            ? "text-gray-300 cursor-not-allowed"
            : ""
        }`}
        onClick={handleConvert}
        disabled={isProcessing || filePaths.length === 0}
        title="Convert files."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleConvert();
          }
        }}
      >
        Convert
        <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
          Ctrl+Enter
        </span>
      </button>
    </>
  );
}
