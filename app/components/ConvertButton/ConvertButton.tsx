"use client";

import { Button } from "antd";
import { useAtom } from "jotai";
import { filesBinaryAtom } from "@/app/atom";
import { invoke } from "@tauri-apps/api/core";

async function createSendData(filesBinary: Uint8Array[]) {
  return filesBinary.map((uint8Array) => {
    return Array.from(uint8Array);
  });
}

export default function ConvertButton() {
  const [filesBinary] = useAtom(filesBinaryAtom);
  async function convert() {
    if (!filesBinary) {
      console.error("filesBinary is undefined");
      return;
    }
    const sendData = await createSendData(filesBinary);
    await invoke("convert", { filesBinary: sendData });
    console.log("convert success");
  }
  return <Button onClick={convert}>Convert</Button>;
}
