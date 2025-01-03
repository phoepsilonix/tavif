"use client";

import { Button } from "antd";
import { useAtom } from "jotai";
import { filesBinaryAtom, fileInfosAtom, extensionTypeAtom, qualityAtom } from "@/app/atom";
import { invoke } from "@tauri-apps/api/core";

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

  async function convert() {
    if (!filesBinary) {
      console.error("filesBinary is undefined");
      return;
    }
    const sendData = await createSendData(filesBinary);
    console.log(fileInfos);
    await invoke("convert", { filesBinary: sendData, fileInfos: fileInfos , extensionType: extensionType, quality: quality});
    console.log("convert success");
  }
  return <Button onClick={convert}>Convert</Button>;
}
