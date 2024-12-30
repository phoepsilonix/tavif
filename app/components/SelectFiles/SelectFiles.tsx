"use client";

import { useAtom } from "jotai";
import { filePathsAtom, filesBinaryAtom } from "@/app/atom";

interface FileInfo {
  fileName: string;
  mimeType: string;
}

function getFileInfo(filePaths: string[]): FileInfo[] {
  return filePaths.map((filePath) => {
    const pathParts: string[] = filePath.split(/[/\\]/);
    const fileName: string = pathParts[pathParts.length - 1];
    const extension: string = fileName.split('.').pop()?.toLowerCase() || '';
    
    let mimeType: string = 'image/png'; // デフォルト値
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      case 'webp':
        mimeType = 'image/webp';
        break;
      case 'avif':
        mimeType = 'image/avif';
        break;
    }

    return {
      fileName,
      mimeType,
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
  const fileInfos: FileInfo[] = getFileInfo(filePaths);

  return (
    <div>
      <ul>
        {filesBinary.length > 0 &&
          fileInfos.map((fileInfo, index) => (
            <li key={fileInfo.fileName} className="flex items-center gap-3 text-sm">
              <div className="flex items-center aspect-square w-14 h-auto">
                <img
                  src={`data:${fileInfo.mimeType};base64,${getFileBase64(
                    filesBinary[index]
                  )}`}
                  alt={fileInfo.fileName}
                />
              </div>
              {fileInfo.fileName}
              <span>{getFileSize(filesBinary[index])}KB</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
