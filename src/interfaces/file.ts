import File from '../entities/file.entity';

export interface GetFilesResponse {
  files: File[];
  total: number;
}

export interface FileListPagination {
  offset: number;
}
