"use client";
import { FileProps } from "./index.d";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { filePathsAtom, fileInfosAtom } from "../../atom";
import { useState, useEffect } from "react";
import { readFile } from "@tauri-apps/plugin-fs";

export default function File({ fileInfo, index }: FileProps) {
  const [filePaths, setFilePaths] = useAtom(filePathsAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const handleImageLoad = async (filePath: string) => {
      try {
        const data = await readFile(filePath);
        const blob = new Blob([data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error("ファイルの読み込みに失敗しました:", error);
      }
    };

    handleImageLoad(filePaths[index]);
  }, [fileInfo.file_name_with_extension]);

  const extension =
    fileInfo.file_name_with_extension.split(".").pop()?.toLowerCase() || "";

  const removeFile = (index: number) => {
    setFilePaths((prev) => prev.filter((_, i) => i !== index));
    setFileInfos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <li
      key={fileInfo.file_name_with_extension}
      className="flex items-center justify-between gap-3 text-sm border-b border-gray-300"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium tracking-wider text-gray-700 px-1">
          {index + 1}
        </span>
        <div className="flex items-center aspect-square w-20 h-auto">
          {imageSrc && (
            <img src={imageSrc} alt={fileInfo.file_name_with_extension} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-gray-700 tracking-wider">
            {fileInfo.file_name_with_extension}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-green-200 text-gray-700 font-bold tracking-wider px-4 py-1 rounded-full">
              {extension.toUpperCase()}
            </span>
            <span className="text-sm font-medium tracking-wider text-gray-700">
              {fileInfo.file_binary_size}KB
            </span>
          </div>
        </div>
      </div>
      <Button
        type="default"
        title="Clear selection."
        danger
        onClick={() => {
          removeFile(index);
        }}
        className="h-fit w-fit py-2 mr-2"
      >
        <DeleteOutlined size={16} className="fill-white" />
      </Button>
    </li>
  );
}
