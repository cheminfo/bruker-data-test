import { join } from 'node:path';

import type { AbsolutePath } from 'data-test-api';
import init from 'data-test-api';

const root = join(import.meta.dirname, '../data');
const PATH_TO_ZIPPED = join(root, 'zipped') as AbsolutePath;
const PATH_TO_COFFEE = join(root, 'flat/coffee') as AbsolutePath;

export const zipped = init(
  PATH_TO_ZIPPED,
  (file) => file.isFile() && file.name.endsWith('.zip'),
);

export const coffee = init(PATH_TO_COFFEE);
