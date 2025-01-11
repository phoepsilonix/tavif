import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import type { CheckboxSelected, FileInfo } from "@/app/index.d";
import { readFileAsync } from "../components/FileDialog/utils";
import { SuccessDialog, ErrorDialog } from "../components/Dialog/Dialog";

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
  setDialog: (dialog: React.ReactNode) => void
): Promise<React.ReactNode> {
  setIsSaving(true);
  const outputDir = await open({
    title: "Select Output Directory",
    directory: true,
    multiple: false,
  });
  if (!outputDir) {
    setIsSaving(false);
    return (
      <ErrorDialog>
        <p>Please select the output directory</p>
      </ErrorDialog>
    )
  }

  await invoke("save_files", {
    filePaths: processedFilePathsSorted,
    outputDir: outputDir,
  });
  setIsSaving(false);

  return (
    <SuccessDialog>
      <p>Saved successfully</p>
      <div className="flex flex-row-reverse w-full pr-2">
        <button
          className="bg-primary text-white border-none h-[98%] p-[6px_16px] text-md tracking-wider hover:bg-[#84ddb8] rounded-md transition-all duration-200"
          onClick={() => setDialog(null)}
        >
          Close
        </button>
      </div>
    </SuccessDialog>
  );
}

export async function saveSelected(
  setIsSaving: (isSaving: boolean) => void,
  processedFilePathsSorted: string[],
  checkboxSelected: CheckboxSelected[],
  setDialog: (dialog: React.ReactNode) => void
): Promise<React.ReactNode> {
  setIsSaving(true);
  const outputDir = await open({
    title: "Select Output Directory",
    directory: true,
    multiple: false,
  });
  if (!outputDir) {
    setIsSaving(false);
    return (
      <ErrorDialog>
        <p>Please select the output directory</p>
      </ErrorDialog>
    );
  }

  const selectedFilePaths = checkboxSelected
    .filter((item) => item.checked)
    .map((item) => processedFilePathsSorted[item.index]);

  await invoke("save_files", {
    filePaths: selectedFilePaths,
    outputDir: outputDir,
  });
  setIsSaving(false);
  setDialog(
    <SuccessDialog>
      <p>Saved successfully</p>
      <div className="flex flex-row-reverse w-full pr-2">
        <button
          className="bg-primary text-white border-none h-[98%] p-[6px_16px] text-md tracking-wider hover:bg-[#84ddb8] rounded-md transition-all duration-200"
          onClick={() => setDialog(null)}
        >
          Close
        </button>
      </div>
    </SuccessDialog>
  );
}

export async function convert(
  setIsProcessing: (isProcessing: boolean) => void,
  filePaths: string[],
  quality: number,
  extensionType: string,
  fileInfos: FileInfo[],
  setProcessedFilePaths: (processedFilePaths: string[]) => void,
  setTabSelected: (tabSelected: "output" | "input") => void,
  setDialog: (dialog: React.ReactNode) => void
): Promise<React.ReactNode> {
  setIsProcessing(true);
  const binarys = await readFileAsync(filePaths);
  if (!binarys) {
    console.error("filesBinary is undefined");
    return (
      <ErrorDialog>
        <p>filesBinary is undefined</p>
        <div className="flex flex-row-reverse w-full pr-2">
          <button
            className="bg-primary text-white border-none h-[98%] p-[6px_16px] text-md tracking-wider hover:bg-red-500 rounded-md transition-all duration-200"
            onClick={() => setDialog(null)}
          >
            Close
          </button>
        </div>
      </ErrorDialog>
    );
  }
  if (!quality) {
    return (
      <ErrorDialog>
        <p>Please set the quality</p>
        <div className="flex flex-row-reverse w-full pr-2">
          <button
            className="bg-primary text-white border-none h-[98%] p-[6px_16px] text-md tracking-wider hover:bg-red-500 rounded-md transition-all duration-200"
            onClick={() => setDialog(null)}
          >
            Close
          </button>
        </div>
      </ErrorDialog>
    );
  }

  const sendData = await createSendData(binarys);
  const result: string[] = await invoke("convert", {
    filesBinary: sendData,
    fileInfos: fileInfos,
    extensionType: extensionType,
    quality: quality,
  });
  setProcessedFilePaths(result);
  setIsProcessing(false);
  setTabSelected("output");
}

async function createSendData(binarys: Uint8Array[]) {
  return binarys.map((uint8Array) => {
    return Array.from(uint8Array);
  });
}
