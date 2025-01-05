import type { FileInfo, ProcessedFileInfo } from "@/app/index.d";
import { invoke } from "@tauri-apps/api/core";

export function getFileInfo(filePaths: string[], binarys: Uint8Array[]): FileInfo[] {
  return filePaths.map((filePath, index) => {
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
      file_binary_size: getFileSize(binarys[index]),
    };
  });
}

export function getFileBase64(binary: Uint8Array): string {
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

export function getFileSize(binary: Uint8Array): number {
  if (!binary) {
    return 0;
  }
  return parseFloat((binary.length / 1024).toFixed(1));
}

export async function getProcessedFileInfo(processedFilePaths: string[], fileInfos: FileInfo[]): Promise<ProcessedFileInfo[]> {
  const processedFileBinarys = await invoke<Uint8Array[]>("get_files_binary", {
    filePaths: processedFilePaths,
  });
  const processedFileInfos: FileInfo[] = getFileInfo(processedFilePaths, processedFileBinarys);

  // fileInfosの順番に基づいてprocessedInfosを整列
  const sortedProcessedInfos = fileInfos
    .map((fileInfo) =>
      processedFileInfos.find(
        (processedInfo) => processedInfo.file_name === fileInfo.file_name
      )
    )
  .filter((info) => info !== undefined) as ProcessedFileInfo[];

  // mime_typeを変換後のものに変更
  sortedProcessedInfos.forEach((processedInfo, index) => {
    const extension: string = processedInfo.file_name_with_extension.split(".").pop()?.toLowerCase() || "";
    processedInfo.mime_type = `image/${extension}`;
  });

  return sortedProcessedInfos.map((processedFile, index) => ({
    file_name: processedFile.file_name,
    file_name_with_extension: processedFile.file_name_with_extension,
    mime_type: processedFile.mime_type,
    file_binary_size: fileInfos[index].file_binary_size,
    processed_file_binary_size: processedFile.file_binary_size,
  }));
}
