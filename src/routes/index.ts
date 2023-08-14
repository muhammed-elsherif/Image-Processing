import express from 'express'
import imagesProcess from './api/process';

const routes = express.Router();

routes.use('/api/process' , imagesProcess);

//routes.use('/listImages', listImagesRouter);

export default routes;