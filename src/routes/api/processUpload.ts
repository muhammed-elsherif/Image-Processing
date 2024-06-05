/* eslint-disable prettier/prettier */
import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs'

const router = express.Router()

// Configure multer for file uploads
const upload = multer()

// Endpoint to handle image processing
router.post('/', upload.single('file'), async (req, res) => {
  const { width, height } = req.body
  const file = req.file

  if (!file) {
    return res.status(400).send('File is required')
  }

  try {
    const resizedImage = await sharp(file.buffer)
      .resize(parseInt(width), parseInt(height))
      .toBuffer()

    // Send the resized image back as a response
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': resizedImage.length,
    })
    res.end(resizedImage)

    // Optionally delete the original uploaded file
    // fs.unlinkSync(filePath)
  } catch (error) {
    console.error('Error processing the image', error)
    res.status(500).send('Error processing the image')
  }
})

export default router
