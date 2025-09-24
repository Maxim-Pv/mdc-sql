import path from 'node:path';

export type UploadKind = 'news' | 'events' | 'hero';
// URL- префикс (под которым будем отдавать файлы)
export const UPLOAD_BASE_URL = '/upload';

export function getUploadRootDir() {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'upload');
}

export function getUploadDir(kind: UploadKind) {
  return path.join(getUploadRootDir(), kind);
}

export function buildUploadFileName(base: string, salt: string, ext: string) {
  return `${base}-${salt}${ext}`;
}

// URL который кладём в БД
export function buildUploadUrl(kind: UploadKind, fileName: string) {
  return `${UPLOAD_BASE_URL}/${kind}/${fileName}`;
}
