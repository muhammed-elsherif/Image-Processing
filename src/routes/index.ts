/* eslint-disable prettier/prettier */
import express from 'express'
import imagesProcess from './api/process'
import router from './api/processUpload'

const routes = express.Router()

routes.use('/api/process', imagesProcess)
routes.use('/api/processUpload', router)

//routes.use('/listImages', listImagesRouter)

export default routes
