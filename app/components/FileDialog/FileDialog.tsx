"use client";

import "@ant-design/v5-patch-for-react-19";
import { open } from "@tauri-apps/plugin-dialog";
import { Button } from "antd";
import { useAtom } from "jotai";
import { filePathsAtom, filesBinaryAtom } from "@/app/atom";
import { readFile } from "@tauri-apps/plugin-fs";

const readFileAsync = async (filePaths: string[]): Promise<Uint8Array[]> => {
  const binarys = await Promise.all(filePaths.map(async (filePath) => {
    const res = await readFile(filePath);
    return res;
  }));
  return binarys;
}

export default function FileDialog() {
  const [_, setFilePaths] = useAtom(filePathsAtom);
  const [__, setFilesBinary] = useAtom(filesBinaryAtom);

  async function openDialog(): Promise<void> {
    const paths: string[] | null = await open({
      title: "画像ファイルを選択してください",
      multiple: true,
      directory: false,
      filters: [
        {
          name: "画像ファイル",
          extensions: ["jpg", "jpeg", "png", "webp", "avif"],
        },
      ],
    });
    if (!paths) return;
    setFilePaths(paths);
    const binarys = await readFileAsync(paths);
    setFilesBinary(binarys);
  }

  return (
    <div>
      <Button type="primary" onClick={openDialog}>
        画像ファイルを選択
      </Button>
    </div>
  );
}
