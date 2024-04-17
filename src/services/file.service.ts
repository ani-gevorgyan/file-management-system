import fs from 'fs';
import { GetFilesResponse } from '../interfaces/file';
import { PAGINATION_LIMIT } from '../constants';
import File from '../entities/file.entity';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

class FileService {
  async uploadFile(fileData: Express.Multer.File): Promise<void> {
    if (!fileData) {
      throw new BadRequestError('File must be provided!');
    }
    await this.generateFile(fileData);
  }

  async generateFile(fileData: Express.Multer.File): Promise<File> {
    const file = new File();
    file.name = fileData.filename;
    file.originalName = fileData.originalname;
    file.mimeType = fileData.mimetype;
    file.extension = fileData.originalname.split('.')[1];
    file.size = fileData.size;
    return file.save();
  }

  async getFiles(offset: number): Promise<GetFilesResponse> {
    const limit = PAGINATION_LIMIT;
    const query = File.createQueryBuilder('file').take(limit);
    if (offset > 1) {
      query.skip(offset);
    }
    const [data, total] = await query.getManyAndCount();
    return { files: data, total };
  }

  async updateFile(id: string, fileData: Express.Multer.File): Promise<File> {
    if (!fileData) {
      throw new BadRequestError('File must be provided!');
    }
    await this.deleteFile(id);
    return this.generateFile(fileData);
  }

  async getFileById(id: string): Promise<File> {
    const file = await File.findOne({ where: { _id: id } });

    if (!file) {
      throw new NotFoundError('File with provided id does not exist!');
    }
    return file;
  }

  async deleteFile(id: string): Promise<void> {
    const file = await this.getFileById(id);

    await File.delete(id);
    const path = `uploads/${file.name}`;
    this.removeFile(path);
  }

  removeFile(filePath: string): void {
    fs.unlinkSync(filePath);
  }
}

const fileService = new FileService();
export default fileService;
