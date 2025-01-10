"use client";

import { Button } from "antd";
import { useAtom } from "jotai";
import {
  filePathsAtom,
  fileInfosAtom,
  extensionTypeAtom,
  qualityAtom,
  processedFilePathsAtom,
  isProcessingAtom,
  tabSelectedAtom,
} from "@/app/lib/atom";
import { Modal } from "antd";
import { convert } from "@/app/lib/utils";
import "@ant-design/v5-patch-for-react-19";
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => {
  return {
    button: css`
      padding: 20px 16px;
      font-weight: bold;
      text-transform: uppercase;
      color: ${token.colorPrimary};
      letter-spacing: 0.1em;
      font-size: 18px;
    `
  };
});

export default function ConvertButton() {
  const [filePaths] = useAtom(filePathsAtom);
  const [fileInfos] = useAtom(fileInfosAtom);
  const [extensionType] = useAtom(extensionTypeAtom);
  const [quality] = useAtom(qualityAtom);
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);
  const [, setProcessedFilePaths] = useAtom(processedFilePathsAtom);
  const [, setTabSelected] = useAtom(tabSelectedAtom);
  const { styles, } = useStyles();
  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      <Button
        onClick={() =>
          convert(
            setIsProcessing,
            filePaths,
            modal,
            quality,
            extensionType,
            fileInfos,
            setProcessedFilePaths,
            setTabSelected
          )
        }
        className={`${styles.button} ${
          filePaths.length > 0 && !isProcessing ? "" : "cursor-not-allowed"
        }`}
        title={
          filePaths.length > 0 && !isProcessing
            ? "Let's convert!"
            : "Please select files first."
        }
        disabled={filePaths.length === 0 || isProcessing}
      >
        Convert
      </Button>
      {contextHolder}
    </>
  );
}
