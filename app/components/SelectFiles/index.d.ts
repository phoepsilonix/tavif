export interface FileInfo {
  file_name: string;
  file_name_with_extension: string;
  mime_type: string;
}

export interface FileProps {
  fileInfo: FileInfo;
  binary: Uint8Array;
}