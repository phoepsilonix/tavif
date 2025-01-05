"use client";

import "@ant-design/v5-patch-for-react-19";
import { open } from "@tauri-apps/plugin-dialog";
import { Button } from "antd";
import { useAtom } from "jotai";
import FolderOpenOutlined from "../icons/FolderOpen";
import { filePathsAtom, thumbnailsBinaryAtom } from "@/app/atom";
import { readFileAsync } from "./utils";
import { invoke } from "@tauri-apps/api/core";

export default function FileDialog() {
  const [_, setFilePaths] = useAtom(filePathsAtom);
  const [___, setThumbnailsBinary] = useAtom(thumbnailsBinaryAtom);

  async function openDialog(): Promise<void> {
    const paths: string[] | null = await open({
      title: "Select Files",
      multiple: true,
      directory: false,
      filters: [
        {
          name: "Image Files",
          extensions: ["jpg", "jpeg", "png", "webp"],
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
    const thumbBinarys = await invoke<Uint8Array[]>("generate_thumbnail", { imgBinarys: binarys });
    setThumbnailsBinary((prev) => {
      const allThumbBinarys = [...prev, ...thumbBinarys]; // 既存のバイナリと新しいバイナリを結合
      const uniqueThumbBinarys = Array.from(new Set(allThumbBinarys)); // 重複を排除
      return uniqueThumbBinarys; // ユニークなバイナリを返す
    });
  }

  return (
    <div>
      <Button type="primary" onClick={openDialog} title="Add files.">
        <FolderOpenOutlined size={16} className="fill-white" />
        Add Files
      </Button>
    </div>
  );
}
