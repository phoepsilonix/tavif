import { describe, it, beforeEach, expect, vi, Mock } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoadingModal from "./LoadingModal";
import { useAtom } from "jotai";
import { isProcessingAtom, isSavingAtom, extensionTypeAtom } from "@/app/atom";

vi.mock("jotai");

describe("LoadingModal", () => {
  beforeEach(() => {
    (useAtom as Mock).mockImplementation((atom) => {
      if (atom === isProcessingAtom) {
        return [true, vi.fn()]; // 処理中
      }
      if (atom === isSavingAtom) {
        return [false, vi.fn()]; // 保存中ではない
      }
      if (atom === extensionTypeAtom) {
        return ["avif", vi.fn()]; // AVIF
      }
      return [null, vi.fn()];
    });
  });

  // フーディングモーダルが表示されていることを確認
  it("renders", () => {
    render(<LoadingModal />);
    expect(screen.getByText("Saving...")).toBeInTheDocument();
  });
});
