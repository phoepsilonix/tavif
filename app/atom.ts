import { atom } from "jotai";

export const filePathsAtom = atom<string[]>([]);

export const filesBinaryAtom = atom<Uint8Array[]>([]);
