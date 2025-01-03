use tauri::Error;
use anyhow::Result;
use image::codecs::avif::AvifEncoder;
use image::ImageEncoder;
use std::fs::File;
use std::io::BufWriter;
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

#[tauri::command]
fn convert(files_binary: Vec<Vec<u8>>) -> Result<Vec<Vec<u8>>, Error> {
    for (i, file_binary) in files_binary.iter().enumerate() {
        let output_path = format!("C:/Users/HARUMI/OneDrive/デスクトップ/output_{}.webp", i);
        encode_to_webp(file_binary.clone(), &output_path, 75)?;
    }
    Ok(files_binary)
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