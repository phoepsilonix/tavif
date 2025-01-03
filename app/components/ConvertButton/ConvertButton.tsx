"use client";

import { Button } from "antd";
import { useAtom } from "jotai";
import { filesBinaryAtom, fileInfosAtom, extensionTypeAtom, qualityAtom, processedFilePathsAtom, processedFilesBinaryAtom, isProcessingAtom } from "@/app/atom";
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
  const [processedFilePaths, setProcessedFilePaths] = useAtom(processedFilePathsAtom);
  const [processedFilesBinary, setProcessedFilesBinary] = useAtom(processedFilesBinaryAtom);

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
        content: "Please set the quality",
      });
      return;
    }

    const sendData = await createSendData(filesBinary);
    const result: [Uint8Array[], string[]] = await invoke("convert", { filesBinary: sendData, fileInfos: fileInfos , extensionType: extensionType, quality: quality});
    console.log("convert success");
    setProcessedFilesBinary(result[0]);
    setProcessedFilePaths(result[1]);
    setIsProcessing(false);
    console.log(processedFilePaths);
  }
  return (
    <>
      <Button onClick={convert} className="font-bold text-lg tracking-wider">Convert</Button>
      {contextHolder}
    </>
  );
}
