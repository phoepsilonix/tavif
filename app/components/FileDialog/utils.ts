import { readFile } from "@tauri-apps/plugin-fs";

export const readFileAsync = async (filePaths: string[]): Promise<Uint8Array[]> => {
  const binarys = await Promise.all(filePaths.map(async (filePath) => {
    const res = await readFile(filePath);
    return res;
  }));
  return binarys;
}