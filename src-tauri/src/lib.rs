use anyhow::Result;
use image::codecs::avif::AvifEncoder;
use image::ImageEncoder;
use rayon::prelude::*;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::BufWriter;
use std::sync::{Arc, Mutex};
use tauri::Error;
use webp;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
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
        .invoke_handler(tauri::generate_handler![convert])
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
