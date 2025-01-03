import { atom } from "jotai";
import { FileInfo } from "./components/SelectFiles/index.d";

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
