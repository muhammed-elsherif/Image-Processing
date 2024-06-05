import { Request } from 'express';
import { MulterFile } from '../types';

declare module 'express-serve-static-core' {
  interface Request {
    file?: MulterFile;
  }
}
