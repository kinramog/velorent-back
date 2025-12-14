import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UPLOAD_DIR } from './constants/storage.constants';

@Injectable()
export class StorageService {

  saveFile(file: Express.Multer.File): string {
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    fs.writeFileSync(filePath, file.buffer);

    // относительный путь
    return `/${UPLOAD_DIR}/${filename}`;
  }

  deleteFile(filePath: string) {
    if (!filePath) return;
    const fullPath = path.join(process.cwd(), filePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
}
