import { describe, it, beforeEach, expect, vi, Mock } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConvertButton from "./ConvertButton";
import { useAtom } from "jotai";
import { filePathsAtom, isProcessingAtom } from "@/app/lib/atom";
import { readFileAsync } from "../FileDialog/utils";

vi.mock("../FileDialog/utils", () => ({
  readFileAsync: vi.fn().mockResolvedValue([new Uint8Array()]),
}));

vi.mock("jotai");

vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn().mockResolvedValue([]),
}));

describe("ConvertButton", () => {
  beforeEach(() => {
    (useAtom as Mock).mockImplementation((atom) => {
      if (atom === filePathsAtom) {
        return [["file1.jpg"], vi.fn()]; // ファイルが選択されている状態
      }
      if (atom === isProcessingAtom) {
        return [false, vi.fn()]; // 処理中ではない
      }
      return [null, vi.fn()];
    });
  });

  // 変換ボタンが表示されていることを確認
  it("renders", () => {
    render(<ConvertButton />);
    expect(screen.getByRole("button", { name: "Convert" })).toBeInTheDocument();
  });

  // 変換ボタンがクリックされたときにconvert関数が呼ばれることを確認
  it("calls convert function on button click", async () => {
    render(<ConvertButton />);
    await userEvent.click(screen.getByRole("button", { name: "Convert" }));

    expect(readFileAsync).toHaveBeenCalledWith(["file1.jpg"]);
  });

  // ファイルが選択されていない場合にボタンが無効化されることを確認
  it("disables button when no files are selected", () => {
    (useAtom as Mock).mockImplementation((atom) => {
      if (atom === filePathsAtom) {
        return [[], vi.fn()]; // ファイルが選択されていない状態
      }
      return [null, vi.fn()];
    });
    render(<ConvertButton />);
    expect(screen.getByRole("button", { name: "Convert" })).toBeDisabled();
  });
});
