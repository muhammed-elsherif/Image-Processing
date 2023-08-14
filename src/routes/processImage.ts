import sharp from 'sharp';
import fs from 'fs/promises';

interface resizeImage {
  filePathSource: string;
  filePathThumb: string;
  width: number;
  height: number;    
}

const processImage = async ({
  filePathSource,
  filePathThumb,
  width,
  height,
}: resizeImage): Promise<Buffer> => {
    const meta: Buffer | null = await fs.readFile(filePathSource).catch(() => null);
    if (!meta) {
      return Promise.reject();
  }

  const imageBuffer: Buffer | null = await sharp(meta)
      .resize(width, height)
      .toBuffer()
      .catch(() => null);

  if (!imageBuffer) {
      return Promise.reject();
  }
  return fs
      .writeFile(filePathThumb, imageBuffer)
      .then(() => {
          return imageBuffer;
      })
      .catch((error) => {
        console.log(`An error occurred during processing: ${error}`);
        return Promise.reject();
      });
};

  /*async function resizeImage() {
      try {
        await sharp(filePathSource)
          .resize(width, height)
          .toFile(filePathThumb)
      } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
      }
    }*/

export default { processImage };