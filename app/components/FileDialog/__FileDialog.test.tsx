import { describe, it, beforeEach, expect, vi, Mock } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileDialog from "./FileDialog";
import { useAtom } from "jotai";
import { filePathsAtom } from "@/app/atom";
import { open } from "@tauri-apps/plugin-dialog";

vi.mock("jotai");

vi.mock("@tauri-apps/plugin-dialog", () => ({
  open: vi.fn().mockResolvedValue(["file1.jpg"]),
}));

describe("FileDialog", () => {
  beforeEach(() => {
    (useAtom as Mock).mockImplementation((atom) => {
      if (atom === filePathsAtom) {
        return [[], vi.fn()]; // ファイルが選択されていない状態
      }
      return [null, vi.fn()];
    });
  });

  // ファイルダイアログが表示されていることを確認
  it("renders", () => {
    render(<FileDialog />);
    expect(
      screen.getByRole("button", { name: "Add Files" })
    ).toBeInTheDocument();
  });

  // ファイルダイアログが表示されていることを確認
  it("calls open function on button click", async () => {
    render(<FileDialog />);
    await userEvent.click(screen.getByRole("button", { name: "Add Files" }));

    expect(open).toHaveBeenCalledWith({
      directory: false,
      filters: [
        {
          extensions: ["jpg", "jpeg", "png", "webp"],
          name: "Image Files",
        },
      ],
      multiple: true,
      title: "Select Files",
    });
  });
});
