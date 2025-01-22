"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  filePathsAtom,
  fileInfosAtom,
  extensionTypeAtom,
  qualityAtom,
  processedFilePathsAtom,
  isProcessingAtom,
  tabSelectedAtom,
  outputTempDirAtom,
} from "@/app/lib/atom";
import { convert } from "@/app/lib/utils";
import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";

export default function ConvertButton() {
  const filePaths = useAtomValue(filePathsAtom);
  const fileInfos = useAtomValue(fileInfosAtom);
  const extensionType = useAtomValue(extensionTypeAtom);
  const quality = useAtomValue(qualityAtom);
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const setProcessedFilePaths = useSetAtom(processedFilePathsAtom);
  const setTabSelected = useSetAtom(tabSelectedAtom);
  const [dialog, setDialog] = useState<React.ReactNode | null>(null);
  const setOutputTempDir = useSetAtom(outputTempDirAtom);

  const handleConvert = async () => {
    const errorDialog = await convert(
      setIsProcessing,
      filePaths,
      quality,
      extensionType,
      fileInfos,
      setProcessedFilePaths,
      setTabSelected,
      setDialog,
      setOutputTempDir
    );
    if (errorDialog) {
      setDialog(errorDialog); // エラーがある場合はエラーダイアログを表示
    }
  };

  return (
    <>
      <button
        onClick={handleConvert}
        className={`bg-white font-bold text-lg uppercase text-primary border-none p-[8px_8px] tracking-wider hover:bg-[#b1fede] rounded-md transition-all duration-200 ${
          filePaths.length > 0 && !isProcessing
            ? ""
            : "cursor-not-allowed opacity-50"
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
