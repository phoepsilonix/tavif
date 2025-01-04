"use client";

import { Button } from "antd";
import { useAtom } from "jotai";
import { filesBinaryAtom, fileInfosAtom, extensionTypeAtom, qualityAtom, processedFilePathsAtom, isProcessingAtom , tabSelectedAtom} from "@/app/atom";
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
        content: "Please set the quality",
      });
      return;
    }

    const sendData = await createSendData(filesBinary);
    const result: string[] = await invoke("convert", { filesBinary: sendData, fileInfos: fileInfos , extensionType: extensionType, quality: quality});
    setProcessedFilePaths(result);
    setIsProcessing(false);
    setTabSelected("output");
  }
  return (
    <>
      <Button onClick={convert} className="font-bold text-lg tracking-wider">Convert</Button>
      {contextHolder}
    </>
  );
}
