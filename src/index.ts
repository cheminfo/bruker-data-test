import type { Dirent, ReadStream } from 'node:fs';
import { createReadStream } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

const root = join(import.meta.dirname, '../data');
const PATH_TO_ZIPPED = join(root, 'zipped/');
const PATH_TO_COFFEE = join(root, 'flat/coffee');

export interface FileEntry {
  /** the full name of the file */
  name: string;
  /** the name without extension */
  basename: string;
  /** the file extension */
  extension: string;
  /** the absolute path to the file */
  path: string;
  /** Relative from data/zipped package directory */
  relativePath: string;
  /** getter of the file stream */
  stream: () => ReadStream;
  /** getter of the buffer file */
  buffer: () => Promise<Buffer>;
}

/**
 * Get zip file async iterator of all data zip files included in the package.
 * @yields - FileEntry objects.
 */
export async function* zippedFilesAsyncEntries() {
  const files = await readdir(PATH_TO_ZIPPED, {
    withFileTypes: true,
    recursive: true,
  });

  yield* direntToFileEntries(files);
}

/**
 * Get zip file iterator of all data zip files included in the package.
 * Useful to be able to use Iterator Helpers on it.
 * @returns - Generator of FileEntry objects.
 */
export async function zippedFilesEntries() {
  const files = await readdir(PATH_TO_ZIPPED, {
    withFileTypes: true,
    recursive: true,
  });

  return direntToFileEntries(files);
}

/**
 * Get an array of all zip files included in the package.
 * @returns - An array of FileEntry objects.
 */
export async function zippedFiles() {
  const entries: FileEntry[] = [];

  for await (const file of zippedFilesAsyncEntries()) {
    entries.push(file);
  }

  return entries;
}

function* direntToFileEntries(files: Dirent[]) {
  for (const file of files) {
    if (!file.isFile()) continue;
    if (!file.name.endsWith('.zip')) continue;

    const path = join(file.parentPath, file.name);
    const parsed = parse(path);

    const entry: FileEntry = {
      name: parsed.base,
      basename: parsed.name,
      extension: parsed.ext,
      path,
      relativePath: path.replace(PATH_TO_ZIPPED, ''),
      stream: () => createReadStream(path),
      buffer: () => readFile(path),
    };

    yield entry;
  }
}

/**
 * Get the root coffee path to be able to list and read files from fs api.
 * @returns - The path to the coffee directory.
 */
export function coffeeDirectory() {
  return PATH_TO_COFFEE;
}
