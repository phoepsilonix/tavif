use anyhow::Result;
use image::codecs::avif::AvifEncoder;
use image::ImageEncoder;
use rayon::prelude::*;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{BufReader, BufWriter, Read};
use std::sync::{Arc, Mutex};
use tauri::Error;
use webp;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            convert,
            get_files_binary,
            save_files,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Debug, Serialize, Deserialize)]
struct FileInfo {
    file_name: String,
    file_name_with_extension: String,
    mime_type: String,
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
enum ExtensionType {
    Webp,
    Avif,
}

#[tauri::command]
fn convert(
    files_binary: Vec<Vec<u8>>,
    file_infos: Vec<FileInfo>,
    extension_type: ExtensionType,
    quality: u8,
) -> Result<Vec<String>, Error> {
    let temp_dir = std::env::temp_dir();
    let output_paths = Arc::new(Mutex::new(Vec::new()));

    files_binary
        .par_iter()
        .enumerate()
        .for_each(|(i, file_binary)| {
            let extension_str = match extension_type {
                ExtensionType::Webp => "webp",
                ExtensionType::Avif => "avif",
            };

            let output_path =
                temp_dir.join(format!("{}.{}", file_infos[i].file_name, extension_str)); // 一時ディレクトリにファイル名を作成

            if extension_type == ExtensionType::Webp {
                encode_to_webp(file_binary.clone(), output_path.to_str().unwrap(), quality)
                    .unwrap();
            } else if extension_type == ExtensionType::Avif {
                encode_to_avif(file_binary.clone(), output_path.to_str().unwrap(), quality)
                    .unwrap();
            }

            output_paths
                .lock()
                .unwrap()
                .push(output_path.to_str().unwrap().to_string());
        });

    // output_pathsのロックを取得
    let output_paths_locked = output_paths.lock().unwrap();
    Ok(output_paths_locked.clone()) // ロックを保持したまま値を返す
}

fn encode_to_avif(img_binary: Vec<u8>, output_path: &str, quality: u8) -> Result<()> {
    let img = image::load_from_memory(&img_binary)?;
    let img = img.to_rgb8();
    let file = File::create(output_path)?;

    let writer = BufWriter::new(file);
    let encoder = AvifEncoder::new_with_speed_quality(writer, 5, quality);
    encoder.write_image(
        img.as_raw(),
        img.width(),
        img.height(),
        image::ColorType::Rgb8,
    )?;
    Ok(())
}

fn encode_to_webp(img_binary: Vec<u8>, output_path: &str, quality: u8) -> Result<()> {
    // 引数のqualityはu8型で統一しているため、ここでf32型に変換する
    let quality = quality as f32;

    let img = image::load_from_memory(&img_binary)?;
    let img = img.to_rgba8();
    let (width, height) = img.dimensions();

    let encoded = webp::Encoder::new(&*img, webp::PixelLayout::Rgba, width, height)
        .encode(quality)
        .to_vec();

    // エンコードされたデータをファイルに書き込む
    std::fs::write(output_path, encoded)?;
    Ok(())
}

#[tauri::command]
fn get_files_binary(file_paths: Vec<String>) -> Result<Vec<Vec<u8>>, Error> {
    let mut files_binary = Vec::new();
    for file_path in file_paths {
        let file = File::open(file_path)?;
        let mut reader = BufReader::new(file);
        let mut buffer = Vec::new();
        reader.read_to_end(&mut buffer)?;
        files_binary.push(buffer);
    }
    Ok(files_binary)
}

#[tauri::command]
fn save_files(file_paths: Vec<String>, output_dir: String) -> Result<(), Error> {
    for file_path in file_paths {
        let file = File::open(&file_path)?;
        let file_name = file_path.split("\\").last().unwrap().to_string();
        let output_path = output_dir.clone() + "/" + &file_name;
        let mut reader = BufReader::new(file);
        let mut buffer = Vec::new();
        reader.read_to_end(&mut buffer)?;
        std::fs::write(output_path, buffer)?;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::path::Path;

    #[test]
    fn test_convert() {
        // テスト用の画像データを準備
        let image_data = include_bytes!("../../public/null.png").to_vec(); // 実際の画像ファイルを指定
        let files_binary = vec![image_data]; // ダミーデータを実際の画像データに変更
        let file_infos = vec![FileInfo {
            file_name: "test".to_string(),
            file_name_with_extension: "test.webp".to_string(),
            mime_type: "image/webp".to_string(),
        }];
        let extension_type = ExtensionType::Webp;
        let quality = 75;

        // convert関数を呼び出す
        let result = convert(files_binary, file_infos, extension_type, quality);

        // 結果を検証
        assert!(result.is_ok());
        let output_paths = result.unwrap();
        assert_eq!(output_paths.len(), 1);
        assert!(Path::new(&output_paths[0]).exists()); // 出力ファイルが存在することを確認
    }

    #[test]
    fn test_get_files_binary() {
        // テスト用のファイルを作成
        let test_file_path = "test_file.txt";
        fs::write(test_file_path, b"Hello, world!").unwrap();

        // get_files_binary関数を呼び出す
        let result = get_files_binary(vec![test_file_path.to_string()]);

        // 結果を検証
        assert!(result.is_ok());
        let files_binary = result.unwrap();
        assert_eq!(files_binary.len(), 1);
        assert_eq!(files_binary[0], b"Hello, world!");

        // テスト用のファイルを削除
        fs::remove_file(test_file_path).unwrap();
    }

    #[test]
    fn test_save_files() {
        // テスト用のデータを準備
        let test_file_path = "test_save_file.txt";
        fs::write(test_file_path, b"Test data").unwrap();
        let output_dir = "."; // 現在のディレクトリに保存

        // save_files関数を呼び出す
        let result = save_files(vec![test_file_path.to_string()], output_dir.to_string());

        // 結果を検証
        assert!(result.is_ok());
        assert!(Path::new(test_file_path).exists()); // 元のファイルが存在することを確認

        // テスト用のファイルを削除
        fs::remove_file(test_file_path).unwrap();
    }
}
