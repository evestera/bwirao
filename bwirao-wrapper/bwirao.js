import initJpeg, {resize as resizeJpeg} from '../bwirao/build/jpeg';
import initPng, {resize as resizePng} from '../bwirao/build/png';
import initWebp, {resize as resizeWebp} from '../bwirao/build/webp';
import initTiff, {resize as resizeTiff} from '../bwirao/build/tiff';

/*
Magic bytes from image crate:
static MAGIC_BYTES: [(&[u8], ImageFormat); 23] = [
    (b"\x89PNG\r\n\x1a\n", ImageFormat::Png),
    (&[0xff, 0xd8, 0xff], ImageFormat::Jpeg),
    (b"GIF89a", ImageFormat::Gif),
    (b"GIF87a", ImageFormat::Gif),
    (b"RIFF", ImageFormat::WebP), // better magic byte detection, see https://github.com/image-rs/image/issues/660
    (b"MM\x00*", ImageFormat::Tiff),
    (b"II*\x00", ImageFormat::Tiff),
    (b"DDS ", ImageFormat::Dds),
    (b"BM", ImageFormat::Bmp),
    (&[0, 0, 1, 0], ImageFormat::Ico),
    (b"#?RADIANCE", ImageFormat::Hdr),
    (b"P1", ImageFormat::Pnm),
    (b"P2", ImageFormat::Pnm),
    (b"P3", ImageFormat::Pnm),
    (b"P4", ImageFormat::Pnm),
    (b"P5", ImageFormat::Pnm),
    (b"P6", ImageFormat::Pnm),
    (b"P7", ImageFormat::Pnm),
    (b"farbfeld", ImageFormat::Farbfeld),
    (b"\0\0\0 ftypavif", ImageFormat::Avif),
    (b"\0\0\0\x1cftypavif", ImageFormat::Avif),
    (&[0x76, 0x2f, 0x31, 0x01], ImageFormat::OpenExr), // = &exr::meta::magic_number::BYTES
    (b"qoif", ImageFormat::Qoi),
];
*/

/**
 * @param {Uint8Array} imageData
 * @param {number} width
 * @param {number} height
 * @returns {Promise<Uint8Array>}
 */
export async function resize(imageData, width, height) {
    if (imageData[0] === 0x89 && imageData[1] === 0x50 && imageData[2] === 0x4e && imageData[3] === 0x47) {
        await initPng();
        return resizePng(imageData, width, height);
    }
    if (imageData[0] === 0xff && imageData[1] === 0xd8 && imageData[2] === 0xff) {
        await initJpeg();
        return resizeJpeg(imageData, width, height);
    }
    if (imageData[0] === 0x52 && imageData[1] === 0x49 && imageData[2] === 0x46 && imageData[3] === 0x46) {
        await initWebp();
        return resizeWebp(imageData, width, height);
    }
    if (imageData[0] === 0x49 && imageData[1] === 0x49 && imageData[2] === 0x2a && imageData[3] === 0x00) {
        await initTiff();
        return resizeTiff(imageData, width, height);
    }
    if (imageData[0] === 0x4d && imageData[1] === 0x4d && imageData[2] === 0x00 && imageData[3] === 0x2a) {
        await initTiff();
        return resizeTiff(imageData, width, height);
    }


    throw new Error('Unsupported image format');
}