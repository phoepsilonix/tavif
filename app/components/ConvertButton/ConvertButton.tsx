"use client";

import { Button } from "antd";
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
import { Modal } from "antd";
import { convert } from "@/app/lib/utils";
import "@ant-design/v5-patch-for-react-19";

export default function ConvertButton() {
  const [filePaths] = useAtom(filePathsAtom);
  const [fileInfos] = useAtom(fileInfosAtom);
  const [extensionType] = useAtom(extensionTypeAtom);
  const [quality] = useAtom(qualityAtom);
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [, setProcessedFilePaths] = useAtom(processedFilePathsAtom);
  const [, setTabSelected] = useAtom(tabSelectedAtom);

  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      <Button
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
        className={`font-bold text-lg tracking-wider text-[#00b96b] py-5 mt-5 uppercase ${
          filePaths.length > 0 && !isProcessing ? "" : "cursor-not-allowed"
        }`}
        title={
          filePaths.length > 0 && !isProcessing
            ? "Let's convert!"
            : "Please select files first."
        }
        disabled={filePaths.length === 0 || isProcessing}
      >
        Convert
      </Button>
      {contextHolder}
    </>
  );
}
