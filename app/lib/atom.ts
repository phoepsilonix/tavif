import { atom } from "jotai";
import type { ProcessedFileInfo, FileInfo } from "@/app/index.d";
import type { CheckboxSelected } from "@/app/index.d";
// 処理中
export const isProcessingAtom = atom<boolean>(false);

// 保存中
export const isSavingAtom = atom<boolean>(false);

// ファイルパス
export const filePathsAtom = atom<string[]>([]);

// ファイル情報
export const fileInfosAtom = atom<FileInfo[]>([]);

// 拡張子
export const extensionTypeAtom = atom<"webp" | "avif">("webp");

// 品質
export const qualityAtom = atom<number>(75);

// 処理済みファイルパス
export const processedFilePathsAtom = atom<string[]>([]);

// 処理&整列済みファイルパス
export const processedFilePathsSortedAtom = atom<string[]>([]);

// 処理済みファイル情報
export const processedFileInfosAtom = atom<ProcessedFileInfo[]>([]);

// タブ選択状態
export const tabSelectedAtom = atom<"input" | "output">("input");

// 各ファイルのチェックボックス選択状態
export const checkboxSelectedAtom = atom<CheckboxSelected[]>([]);

// アプリにフォーカスされているか
export const isFocusedAtom = atom<boolean>(false);

// ライセンスダイアログの表示状態
export const isLicenseDialogOpenAtom = atom<boolean>(false);

// ウィンドウメニューのダイアログの内容
export const windowMenuDialogAtom = atom<React.ReactNode | null>(null);
