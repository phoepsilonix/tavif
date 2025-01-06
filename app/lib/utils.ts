import { open } from "@tauri-apps/plugin-dialog";

export async function openDialog(
  setFilePaths: (paths: string[]) => void,
  prevPaths: string[]
): Promise<void> {
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
  const allPaths = [...prevPaths, ...paths]; // 既存のパスと新しいパスを結合
  const uniquePaths = Array.from(new Set(allPaths)); // 重複を排除
  setFilePaths(uniquePaths); // 計算された配列を直接渡す
}
