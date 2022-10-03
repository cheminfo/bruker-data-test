import { join } from 'path';

import { fileCollectionFromPath, FileCollection } from 'filelist-utils';

const root = join(__dirname, '../data');
const PATH_TO_ZIPPED = join(root, 'zipped');
const PATH_TO_COFFEE = join(root, 'flat/coffee');

const cache: Record<string, FileCollection> = {};

async function loadFileCollection(path: string) {
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
  const fileCollection = await loadFileCollection(PATH_TO_ZIPPED);
  return fileCollection.files.map((d) => d.name);
}

export async function getFile(name: string) {
  const fileCollection = await loadFileCollection(PATH_TO_ZIPPED);
  const file = fileCollection.files.find((file) => file.name === name);

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
  return loadFileCollection(PATH_TO_ZIPPED);
}

export function getCoffee() {
  return loadFileCollection(PATH_TO_COFFEE);
}
