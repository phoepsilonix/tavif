"use client";

import { useAtom } from "jotai";
import { filePathsAtom, filesBinaryAtom, fileInfosAtom } from "@/app/atom";
import { FileInfo } from "./index.d";
import { useEffect } from "react";
import File from "./File";

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

export default function SelectFiles() {
  const [filePaths] = useAtom(filePathsAtom);
  const [filesBinary] = useAtom(filesBinaryAtom);
  const [fileInfos, setFileInfos] = useAtom(fileInfosAtom);

  useEffect(() => {
    const infos: FileInfo[] = getFileInfo(filePaths);
    setFileInfos(infos);
  }, [filePaths]);

  return (
    <div>
      <ul>
        {filesBinary.length > 0 &&
          fileInfos.map((fileInfo, index) => (
            <File key={fileInfo.file_name_with_extension} fileInfo={fileInfo} binary={filesBinary[index]} />
          ))}
      </ul>
    </div>
  );
}
