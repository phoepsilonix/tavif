import { FileInfo } from ".";

export function getFileInfo(filePaths: string[]): FileInfo[] {
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