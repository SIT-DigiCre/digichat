import sharp from "sharp";

/**
 * Convert image buffer to WebP format
 * @param buffer Input image buffer
 * @param quality WebP quality (1-100, default: 80)
 * @returns WebP image buffer
 */
export async function convertToWebP(
  buffer: Buffer,
  quality: number = 80
): Promise<Buffer> {
  return await sharp(buffer).webp({ quality }).toBuffer();
}
