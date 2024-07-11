use std::io::Cursor;
use wasm_bindgen::prelude::*;

pub fn set_panic_hook() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn resize(
    image_bytes: &[u8],
    width: u32,
    height: u32,
) -> Option<Vec<u8>> {
    set_panic_hook();

    let img = match image::load_from_memory(image_bytes) {
        Ok(img) => img,
        Err(_) => return None
    };
    let size = std::cmp::min(img.width(), img.height());
    let img = img.crop_imm(0, 0, size, size);
    let img = img.resize(width, height, image::imageops::FilterType::Nearest);
//     let img = img.resize(width, height, image::imageops::FilterType::Lanczos3);
//     let img = img.thumbnail(width, height);

    let mut output_bytes: Vec<u8> = Vec::new();
    img.write_to(&mut Cursor::new(&mut output_bytes), image::ImageFormat::WebP).unwrap();

    Some(output_bytes)
}
