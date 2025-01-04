"use client";

import { Button } from "antd";
import { useAtom } from "jotai";
import {
  filesBinaryAtom,
  fileInfosAtom,
  extensionTypeAtom,
  qualityAtom,
  processedFilePathsAtom,
  processedFilesBinaryAtom,
  isProcessingAtom,
  tabSelectedAtom,
} from "@/app/atom";
import { invoke } from "@tauri-apps/api/core";
import { Modal } from "antd";

async function createSendData(filesBinary: Uint8Array[]) {
  return filesBinary.map((uint8Array) => {
    return Array.from(uint8Array);
  });
}

export default function ConvertButton() {
  const [filesBinary] = useAtom(filesBinaryAtom);
  const [fileInfos] = useAtom(fileInfosAtom);
  const [extensionType] = useAtom(extensionTypeAtom);
  const [quality] = useAtom(qualityAtom);
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [processedFilePaths, setProcessedFilePaths] = useAtom(
    processedFilePathsAtom
  );
  const [tabSelected, setTabSelected] = useAtom(tabSelectedAtom);

  const [modal, contextHolder] = Modal.useModal();

  async function convert() {
    setIsProcessing(true);
    if (!filesBinary) {
      console.error("filesBinary is undefined");
      return;
    }
    if (!quality) {
      modal.error({
        title: "Quality is not set",
        centered: true,
        content: "Please set the quality",
      });
      return;
    }

    const sendData = await createSendData(filesBinary);
    const result: string[] = await invoke("convert", {
      filesBinary: sendData,
      fileInfos: fileInfos,
      extensionType: extensionType,
      quality: quality,
    });
    setProcessedFilePaths(result);
    setIsProcessing(false);
    setTabSelected("output");
  }
  return (
    <>
      <Button
        onClick={convert}
        className={`font-bold text-lg tracking-wider text-[#00b96b] py-5 mt-5 uppercase ${
          filesBinary.length > 0 ? "" : "cursor-not-allowed opacity-50"
        }`}
        title={filesBinary.length > 0 ? "Let's convert!" : "Please select files first."}
      >
        Convert
      </Button>
      {contextHolder}
    </>
  );
}
