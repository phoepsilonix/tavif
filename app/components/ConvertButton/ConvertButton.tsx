"use client";

import { useAtom } from "jotai";
import {
  filePathsAtom,
  fileInfosAtom,
  extensionTypeAtom,
  qualityAtom,
  processedFilePathsAtom,
  isProcessingAtom,
  tabSelectedAtom,
} from "@/app/lib/atom";
import { convert } from "@/app/lib/utils";
import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";

export default function ConvertButton() {
  const [filePaths] = useAtom(filePathsAtom);
  const [fileInfos] = useAtom(fileInfosAtom);
  const [extensionType] = useAtom(extensionTypeAtom);
  const [quality] = useAtom(qualityAtom);
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [, setProcessedFilePaths] = useAtom(processedFilePathsAtom);
  const [, setTabSelected] = useAtom(tabSelectedAtom);
  const [dialog, setDialog] = useState<React.ReactNode | null>(null);

  const handleConvert = async () => {
    const result = await convert(setIsProcessing, filePaths, quality, extensionType, fileInfos, setProcessedFilePaths, setTabSelected, setDialog);
    if (result) {
      setDialog(result);
    }
  };

  return (
    <>
      <button
        onClick={handleConvert}
        className={`bg-white font-bold text-lg uppercase text-primary border-none p-[8px_8px] tracking-wider hover:bg-[#b1fede] rounded-md transition-all duration-200 ${
          filePaths.length > 0 && !isProcessing ? "" : "cursor-not-allowed opacity-50"
        }`}
        title={
          filePaths.length > 0 && !isProcessing
            ? "Let's convert!"
            : "Please select files first."
        }
        disabled={filePaths.length === 0 || isProcessing}
      >
        Convert
      </button>
      {dialog}
    </>
  );
}

