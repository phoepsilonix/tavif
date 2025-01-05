export interface CheckboxSelected {
  index: number;
  checked: boolean;
}

export interface FileInfo {
  file_name: string;
  file_name_with_extension: string;
  mime_type: string;
  file_binary_size: number;
}

export interface ProcessedFileInfo {
  file_name: string;
  file_name_with_extension: string;
  mime_type: string;
  file_binary_size: number;
  processed_file_binary_size: number;
}
