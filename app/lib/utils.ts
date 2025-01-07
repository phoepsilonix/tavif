import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import type { ModalType } from "antd/es/modal/index.d";
import type { CheckboxSelected } from "@/app/index.d";

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

export async function saveAll(
  setIsSaving: (isSaving: boolean) => void,
  processedFilePathsSorted: string[],
  modal: ModalType
) {
  setIsSaving(true);
  const outputDir = await open({
    title: "Select Output Directory",
    directory: true,
    multiple: false,
  });
  if (!outputDir) {
    setIsSaving(false);
    return;
  }

  await invoke("save_files", {
    filePaths: processedFilePathsSorted,
    outputDir: outputDir,
  });
  setIsSaving(false);
  modal.success({
    title: "Success",
    centered: true,
    content: "Saved successfully",
  });
}

export async function saveSelected(
  setIsSaving: (isSaving: boolean) => void,
  processedFilePathsSorted: string[],
  checkboxSelected: CheckboxSelected[],
  modal: ModalType
) {
  setIsSaving(true);
  const outputDir = await open({
    title: "Select Output Directory",
    directory: true,
    multiple: false,
  });
  if (!outputDir) {
    setIsSaving(false);
    return;
  }

  const selectedFilePaths = checkboxSelected
    .filter((item) => item.checked)
    .map((item) => processedFilePathsSorted[item.index]);

  await invoke("save_files", {
    filePaths: selectedFilePaths,
    outputDir: outputDir,
  });
  setIsSaving(false);
  modal.success({
    title: "Success",
    centered: true,
    content: "Saved successfully",
  });
}
