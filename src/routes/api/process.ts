/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { Stats } from 'fs'
import processing from '../processImage'

const imagesProcess = express.Router()

imagesProcess.get('/images', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query['filename'] as string
  const height = parseInt(req.query['height'] as string, 10)
  const width = parseInt(req.query['width'] as string, 10)

  // res.status(400) => bad request
  if (!filename) {
    res.status(400).send('Error: Image URL or Name not provided!')
    return
  }

  if (!height) {
    res.status(400).send('Error height not exist!')
    return
  }

  if (!width) {
    res.status(400).send('Error width not exist!')
    return
  }

  const filePathSource = `${path.resolve(__dirname, `../../../assets/full/${filename}.jpg`)}`
  const filePathThumb = `${path.join(
    __dirname,
    `../../../assets/thumb/${filename}-${width}x${height}.jpg`
  )}`

  // Check if image exist
  const fullImage: Stats | null = await fs.stat(filePathSource).catch(() => {
    return null
  })

  // Check if image has been resized before
  const thumbImage: Stats | null = await fs.stat(filePathThumb).catch(() => {
    return null
  })

  if (thumbImage) {
    fs.readFile(filePathThumb)
      .then((Data: Buffer) => {
        res.status(200).contentType('jpg').send(Data)
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image')
      })
  }
  // Resize the image
  else {
    await processing
      .processImage({
        filePathSource,
        filePathThumb,
        width,
        height
      })
      .then((resizedImage: Buffer) => {
        res.status(200).contentType('jpg').send(resizedImage)
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image')
      })
  }
})

export default imagesProcess
