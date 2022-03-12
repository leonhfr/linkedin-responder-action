import fs from 'fs';

/**
 * Reads the file from path synchronously. Uses UTF-8 encoding.
 * @param path
 * @returns File contents.
 */
export function readFile(path: string): string | Error {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err: any) {
    return new Error(err);
  }
}
