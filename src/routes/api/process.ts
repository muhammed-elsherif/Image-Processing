import express, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { Stats } from 'fs'
import processing from '../processImage'

const imagesProcess = express.Router();

imagesProcess.get('/images', async (req: Request, res: Response): Promise<void> => {
    
    const filename = req.query['filename'];
    const height = req.query['height'] ? parseInt(req.query['height'] as string, 10) : null;
    const width = req.query['width'] ? parseInt(req.query['width'] as string, 10) : null;

    //res.status(400) => bad request
    if(!filename) {
        res.status(400).send("Error filename not exist!");
        return;
    }

    if(!height) {
        res.status(400).send("Error height not exist!");
        return;
    }

    if(!width) {
        res.status(400).send("Error width not exist!");
        return;
    }

    const filePathSource = `${path.resolve(__dirname, `../../../assets/full/${filename}.jpg`)}`;
    // const filePathSource = `D:/server/node_js/assets/full/${filename}.jpg`;
    const filePathThumb = `${path.join(__dirname, `../../../assets/thumb/${filename}-${height}x${width}.jpg`)}`;
    // const filePathThumb = `D:/server/node_js/assets/thumb/${filename}-${height}x${width}.jpg`;

    /*check if image exist
        res.status(404) => not found*/
    const fullImage: Stats | null = await fs.stat(filePathSource).catch(() => {
        res.status(404).send('Image not found!');
        return null;
    }); 
    //check if image has been resized before
    const thumbImage: Stats | null = await fs.stat(filePathThumb).catch(() => {
        return null;
    });
    /*if image resized before
        req.status(500) => internal server error*/
    if (thumbImage) {
        fs.readFile(filePathThumb)
            .then((Data: Buffer) => {
                res.status(200).contentType('jpg').send(Data);
            })
            .catch(() => {
                res.status(500).send('Error occured processing the image');
            });
    }
    //resize image
    else {
        processing
            .processImage({
                filePathSource,
                filePathThumb,
                width,
                height,
            })
            .then((resizedImage: Buffer) => {
                res.status(200).contentType('jpg').send(resizedImage);
            })
            .catch(() => {
                res.status(500).send('Error occured processing the image');
            });
    }
});

export default imagesProcess;