import { atom } from "jotai";
import { FileInfo } from "./components/SelectFiles/index.d";

// 処理中
export const isProcessingAtom = atom<boolean>(false);

// ファイルパス
export const filePathsAtom = atom<string[]>([]);

// ファイルバイナリ
export const filesBinaryAtom = atom<Uint8Array[]>([]);

// ファイル情報
export const fileInfosAtom = atom<FileInfo[]>([]);

// 拡張子
export const extensionTypeAtom = atom<"webp" | "avif">("webp");

// 品質
export const qualityAtom = atom<number>(75);

// 処理済みファイルパス
export const processedFilePathsAtom = atom<string[]>([]);

// 処理済みファイルバイナリ
export const processedFilesBinaryAtom = atom<Uint8Array[]>([]);

// 処理済みファイル情報
export const processedFileInfosAtom = atom<FileInfo[]>([]);

// タブ選択状態
export const tabSelectedAtom = atom<"input" | "output">("input");
