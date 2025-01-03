"use client";

import { useAtom } from "jotai";
import { filePathsAtom, filesBinaryAtom, fileInfosAtom } from "@/app/atom";
import { FileInfo } from "./index.d";
import { useEffect } from "react";

function getFileInfo(filePaths: string[]): FileInfo[] {
  return filePaths.map((filePath) => {
    const pathParts: string[] = filePath.split(/[/\\]/);
    const fileNameWithExtension: string = pathParts[pathParts.length - 1];
    const fileName: string = fileNameWithExtension
      .split(".")
      .slice(0, -1)
      .join(".");
    const extension: string = fileName.split(".").pop()?.toLowerCase() || "";

    let mimeType: string = "image/png"; // デフォルト値
    switch (extension) {
      case "jpg":
      case "jpeg":
        mimeType = "image/jpeg";
        break;
      case "png":
        mimeType = "image/png";
        break;
      case "webp":
        mimeType = "image/webp";
        break;
      case "avif":
        mimeType = "image/avif";
        break;
    }

    return {
      file_name: fileName,
      file_name_with_extension: fileNameWithExtension,
      mime_type: mimeType,
    };
  });
}

function getFileBase64(binary: Uint8Array): string {
  if (!binary || binary.length === 0) {
    return "";
  }
  const len = binary.length;
  let base64 = "";
  for (let i = 0; i < len; i++) {
    base64 += String.fromCharCode(binary[i]);
  }
  return btoa(base64);
}

function getFileSize(binary: Uint8Array): number {
  if (!binary) {
    return 0;
  }
  return parseFloat((binary.length / 1024).toFixed(1));
}

export default function SelectFiles() {
  const [filePaths] = useAtom(filePathsAtom);
  const [filesBinary] = useAtom(filesBinaryAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);

  useEffect(() => {
    const infos: FileInfo[] = getFileInfo(filePaths);
    setFileInfos(infos);
    console.log(fileInfos);
  }, [filePaths]);

  return (
    <div>
      <ul>
        {filesBinary.length > 0 &&
          fileInfos.map((fileInfo, index) => (
            <li
              key={fileInfo.file_name_with_extension}
              className="flex items-center gap-3 text-sm"
            >
              <div className="flex items-center aspect-square w-14 h-auto">
                <img
                  src={`data:${fileInfo.mime_type};base64,${getFileBase64(
                    filesBinary[index]
                  )}`}
                  alt={fileInfo.file_name_with_extension}
                />
              </div>
              {fileInfo.file_name_with_extension}
              <span>{getFileSize(filesBinary[index])}KB</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
