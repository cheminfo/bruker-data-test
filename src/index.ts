import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

export function getZipped() {
  return fileListFromPath(join(__dirname, '../data/zipped'));
}

export function getCoffee() {
  return fileListFromPath(join(__dirname, '../data/flat/coffee'));
}
