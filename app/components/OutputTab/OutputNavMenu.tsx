import { Button } from "antd";
import { useAtom } from "jotai";
import {
  processedFilePathsSortedAtom,
  checkboxSelectedAtom,
  processedFilePathsAtom,
  isSavingAtom,
} from "@/app/lib/atom";
import DownloadOutlined from "../icons/Download";
import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox, CheckboxChangeEvent } from "antd";
import Null from "./Null";
import "@ant-design/v5-patch-for-react-19";
import { Modal } from "antd";
import { saveAll, saveSelected } from "@/app/lib/utils";

export default function OutputNavMenu() {
  const [processedFilePathsSorted, setProcessedFilePathsSorted] = useAtom(
    processedFilePathsSortedAtom
  );
  const [checkboxSelected, setCheckboxSelected] = useAtom(checkboxSelectedAtom);
  const [, setProcessedFilePaths] = useAtom(
    processedFilePathsAtom
  );
  const [, setIsSaving] = useAtom(isSavingAtom);
  const [modal, modalContextHolder] = Modal.useModal();


  function removeResult() {
    setProcessedFilePathsSorted([]);
    setCheckboxSelected([]);
    setProcessedFilePaths([]);
  }

  function handleCheckboxChange(e: CheckboxChangeEvent) {
    setCheckboxSelected((prev) =>
      prev.map((item) => ({
        ...item,
        checked: e.target.checked,
      }))
    );
  }

  if (processedFilePathsSorted.length === 0) return <Null />;

  return (
    <div className="absolute top-1 left-0 w-full h-fit p-2 flex items-center justify-between gap-2 bg-gray-50/50 backdrop-blur-sm border-l-2 border-r-2 border-gray-300 z-10">
      {modalContextHolder}
      <div className="flex items-center gap-2">
        <Button type="primary" onClick={() => saveAll(setIsSaving, processedFilePathsSorted, modal)} title="Save all files.">
          <DownloadOutlined size={16} className="fill-white" />
          Save ALL
        </Button>
        <Button
          type="primary"
          onClick={() => saveSelected(setIsSaving, processedFilePathsSorted, checkboxSelected, modal)}
          title="Save selected files."
        >
          <DownloadOutlined size={16} className="fill-white" />
          Save Selected
        </Button>
        <Button
          type="default"
          onClick={removeResult}
          title="Delete all processed files from the temp directory."
        >
          <DeleteOutlined size={16} className="fill-white" />
          Remove Result
        </Button>
      </div>
      <label className="flex items-center gap-2 cursor-pointer mr-3">
        All
        <Checkbox onChange={handleCheckboxChange} defaultChecked={true} />
      </label>
    </div>
  );
}
