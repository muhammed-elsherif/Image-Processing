import path from "path";
import processing from "../../routes/processImage";

const filePathSource = `${path.resolve(__dirname, `../../../assets/full/palmtunnel.jpg`)}`;
const filePathThumb = `${path.join(__dirname, `../../../assets/thumb/palmtunnel.jpg`)}`;

describe('The imageResizer function', (): void => {
    it('returns a buffer after sucessfully resizing an image', async () => {
        const imageBuffer: Buffer = await processing.processImage({
            filePathSource,
            filePathThumb,
            width: 200,
            height: 200,
        });
        expect(imageBuffer)
        .toBeInstanceOf(Buffer);
    });
});