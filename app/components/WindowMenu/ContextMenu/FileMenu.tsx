"use client";

import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
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
} from "@/app/lib/atom";
import { convert, openDialog, saveAll, saveSelected } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useStyles } from "@/app/components/WindowMenu/WindowMenu";

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
  const [isFocused, ] = useAtom(isFocusedAtom);
  const fileButtonRef = useRef<HTMLButtonElement | null>(null);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [, setProcessedFilePaths] = useAtom(
    processedFilePathsAtom
  );
  const [, setIsSaving] = useAtom(isSavingAtom);
  const [quality, ] = useAtom(qualityAtom);
  const [extensionType, ] = useAtom(extensionTypeAtom);
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [modal, ] = Modal.useModal();
  const { styles, } = useStyles();

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
        saveSelected(
          setIsSaving,
          processedFilePathsSorted,
          checkboxSelected,
          modal
        );
      } else if (
        event.key === "Enter" &&
        isFocused &&
        filePaths.length > 0 &&
        !isProcessing
      ) {
        event.preventDefault();
        convert(
          setIsProcessing,
          filePaths,
          modal,
          quality,
          extensionType,
          fileInfos,
          setProcessedFilePaths,
          setTabSelected
        );
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
        className={styles.button}
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
  const [tabSelected, ] = useAtom(tabSelectedAtom);
  const [, setFileInfos] = useAtom(fileInfosAtom);
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [, setProcessedFilePaths] = useAtom(
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
  const [processedFilePathsSorted, ] = useAtom(
    processedFilePathsSortedAtom
  );
  const [modal, ] = Modal.useModal();
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
  const [processedFilePathsSorted, ] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, ] = useAtom(checkboxSelectedAtom);
  const [modal, ] = Modal.useModal();
  return (
    <button
      className={`flex items-center justify-between leading-5 w-full ${
        isSaving || processedFilePathsSorted.length === 0
          ? "text-gray-300 cursor-not-allowed"
          : ""
      }`}
      onClick={() =>
        saveSelected(
          setIsSaving,
          processedFilePathsSorted,
          checkboxSelected,
          modal
        )
      }
      disabled={isSaving || processedFilePathsSorted.length === 0}
      title="Save selected files."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          saveSelected(
            setIsSaving,
            processedFilePathsSorted,
            checkboxSelected,
            modal
          );
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

function FileConvert(): React.ReactNode {
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [, setProcessedFilePaths] = useAtom(
    processedFilePathsAtom
  );
  const [modal, ] = Modal.useModal();
  const [filePaths, ] = useAtom(filePathsAtom);
  const [fileInfos, ] = useAtom(fileInfosAtom);
  const [quality, ] = useAtom(qualityAtom);
  const [extensionType, ] = useAtom(extensionTypeAtom);
  const [, setTabSelected] = useAtom(tabSelectedAtom);
  return (
    <button
      className={`flex items-center justify-between leading-5 w-full ${
        isProcessing || filePaths.length === 0
          ? "text-gray-300 cursor-not-allowed"
          : ""
      }`}
      onClick={() =>
        convert(
          setIsProcessing,
          filePaths,
          modal,
          quality,
          extensionType,
          fileInfos,
          setProcessedFilePaths,
          setTabSelected
        )
      }
      disabled={isProcessing || filePaths.length === 0}
      title="Convert files."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          convert(
            setIsProcessing,
            filePaths,
            modal,
            quality,
            extensionType,
            fileInfos,
            setProcessedFilePaths,
            setTabSelected
          );
        }
      }}
    >
      Convert
      <span className="text-xs pl-4 flex items-center justify-center pt-[1px]">
        Ctrl+Enter
      </span>
    </button>
  );
}
