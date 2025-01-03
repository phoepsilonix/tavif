"use client";

import { Button } from "antd";
import { useAtom } from "jotai";
import { filesBinaryAtom, fileInfosAtom, extensionTypeAtom, qualityAtom } from "@/app/atom";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
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
  const [modal, contextHolder] = Modal.useModal();

  async function convert() {
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

    const outputPath = await open({
      title: "Save Location",
      directory: true,
      multiple: false,
      canCreateDirectories: true,
    });
    if (!outputPath) {
      return;
    }

    const sendData = await createSendData(filesBinary);
    await invoke("convert", { filesBinary: sendData, fileInfos: fileInfos , extensionType: extensionType, quality: quality, outputPath: outputPath});
    console.log("convert success");
  }
  return (
    <>
      <Button onClick={convert}>Convert</Button>
      {contextHolder}
    </>
  );
}
