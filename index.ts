import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import os from 'os';
// import * as fs from "fs";
import { readdirSync } from 'fs-extra';
import { randomUUID } from 'crypto';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = 5000;

const IMAGES_DIR = path.join(__dirname, 'static', 'images');
const IMAGES_BASE_URL = 'http://localhost:5000/images/'

const upload = multer({
  // dest: IMAGES_DIR,
  storage: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, IMAGES_DIR);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, file.originalname);//randomUUID() + '-' + file.originalname
    }
  })
}).single("file");

app.post("images", upload, (req: Request, res: Response) => {
  const file: Express.Multer.File = req.file || {} as Express.Multer.File;
  res.json({ ...file, url: IMAGES_BASE_URL + file.originalname });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
