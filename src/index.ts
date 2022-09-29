import { join } from 'path';

import {
  FileCollection,
  fileCollectionFromPath,
  FileCollectionItem,
} from 'filelist-utils';

const root = join(__dirname, '../data');
const PATH_TO_ZIPPED = join(root, 'zipped');
const PATH_TO_COFFEE = join(root, 'flat/coffee');

const cache: Record<string, FileCollection> = {};

async function loadFileList(path: string) {
  if (cache[path]) {
    return cache[path];
  }

  cache[path] = await fileCollectionFromPath(path, {
    unzip: { zipExtensions: [] },
    ungzip: { gzipExtensions: [] },
  });

  return cache[path];
}

export async function getList() {
  const files = (await loadFileList(PATH_TO_ZIPPED)).items;
  return files.map((d: FileCollectionItem) => d.name);
}

export async function getFile(name: string) {
  const fileList = (await loadFileList(PATH_TO_ZIPPED)).items;
  const file = fileList.find((file) => file.name === name);

  if (!file) {
    throw new Error(`There is not a zip file for ${name}`);
  }

  return file;
}

export async function getData(name: string) {
  const file = await getFile(name);
  return file.arrayBuffer();
}

export function getZipped() {
  return loadFileList(PATH_TO_ZIPPED);
}

export function getCoffee() {
  return loadFileList(PATH_TO_COFFEE);
}
