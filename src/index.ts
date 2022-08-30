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

export function getZipped() {
  return loadFileList(PATH_TO_ZIPPEED);
}

export function getCoffee() {
  return loadFileList(PATH_TO_COFFEE);
}
