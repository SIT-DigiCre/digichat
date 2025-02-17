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
  const isAnimation = await checkAnimation(buffer);
  return await sharp(buffer, { animated: isAnimation })
    .webp({ quality })
    .toBuffer();
}

/**
 * Check animation file
 * @param buffer Input image buffer
 * @returns true if the image is an animation, false otherwise
 */
async function checkAnimation(buffer: Buffer): Promise<boolean> {
  try {
    const metadata = await sharp(buffer).metadata();
    if (!metadata.pages) {
      return false;
    }
    return metadata.pages > 1;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    return false;
  }
}
