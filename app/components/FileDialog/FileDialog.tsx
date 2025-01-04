"use client";

import "@ant-design/v5-patch-for-react-19";
import { open } from "@tauri-apps/plugin-dialog";
import { Button } from "antd";
import { useAtom } from "jotai";
import FolderOpenOutlined from "../icons/FolderOpen";
import { filePathsAtom, filesBinaryAtom } from "@/app/atom";
import { readFileAsync } from "./utils";

export default function FileDialog() {
  const [_, setFilePaths] = useAtom(filePathsAtom);
  const [__, setFilesBinary] = useAtom(filesBinaryAtom);

  async function openDialog(): Promise<void> {
    const paths: string[] | null = await open({
      title: "Select Files",
      multiple: true,
      directory: false,
      filters: [
        {
          name: "Image Files",
          extensions: ["jpg", "jpeg", "png", "webp", "avif"],
        },
      ],
    });
    if (!paths) return;
    setFilePaths((prevPaths) => {
      const allPaths = [...prevPaths, ...paths]; // 既存のパスと新しいパスを結合
      const uniquePaths = Array.from(new Set(allPaths)); // 重複を排除
      return uniquePaths; // ユニークなパスを返す
    });
    const binarys = await readFileAsync(paths);
    setFilesBinary((prevBinarys) => {
      const allBinarys = [...prevBinarys, ...binarys]; // 既存のバイナリと新しいバイナリを結合
      const uniqueBinarys = Array.from(new Set(allBinarys)); // 重複を排除
      return uniqueBinarys; // ユニークなバイナリを返す
    });
  }

  return (
    <div>
      <Button type="primary" onClick={openDialog}>
        <FolderOpenOutlined size={16} className="fill-white" />
        Add Files
      </Button>
    </div>
  );
}
