import { FileProps } from "../SelectFiles";

export interface ProcessedFilesProps extends FileProps {
  processedFileBinary: Uint8Array;
}