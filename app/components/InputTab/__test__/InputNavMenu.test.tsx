import { describe, it, beforeEach, expect, vi, Mock } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputNavMenu from "../InputNavMenu";
import { useAtom } from "jotai";
import { filePathsAtom } from "@/app/lib/atom";

vi.mock("jotai");

describe("InputNavMenu", () => {
  let setFilePaths: Mock;

  beforeEach(() => {
    setFilePaths = vi.fn();
    (useAtom as Mock).mockImplementation((atom) => {
      if (atom === filePathsAtom) {
        return [[["file1.jpg"]], setFilePaths];
      }
      return [null, vi.fn()];
    });
  });

  // フビゲーションメニューが表示されていることを確認
  it("renders", () => {
    render(<InputNavMenu />);
    expect(
      screen.getByRole("button", { name: /Remove All/i })
    ).toBeInTheDocument();
  });

  // Remove Allボタンがクリックされたとき、filePathsAtomが空になることを確認
  it("clears filePathsAtom on button click", async () => {
    render(<InputNavMenu />);
    await userEvent.click(screen.getByRole("button", { name: /Remove All/i }));

    await waitFor(() => {
      expect(setFilePaths).toHaveBeenCalledWith([]);
    });
  });
});
