import { join } from 'path';

import { fileListFromPath, PartialFileList } from 'filelist-utils';

const root = join(__dirname, '../data');
const PATH_TO_ZIPPEED = join(root, 'zipped');
const PATH_TO_COFFEE = join(root, 'flat/coffee');

const cache: Record<string, PartialFileList> = {};

async function loadFileList(path: string) {
  if (cache[path]) {
    return cache[path];
  }

  cache[path] = await fileListFromPath(path, {
    unzip: { zipExtensions: [] },
    ungzip: { gzipExtensions: [] },
  });

  return cache[path];
}

export async function getList() {
  const files = await loadFileList(PATH_TO_ZIPPEED);
  return files.map((d) => d.name);
}

export async function getFile(name: string) {
  const fileList = await loadFileList(PATH_TO_ZIPPEED);
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
  return loadFileList(PATH_TO_ZIPPEED);
}

export function getCoffee() {
  return loadFileList(PATH_TO_COFFEE);
}
