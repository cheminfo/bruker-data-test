# bruker-data-test

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

## Installation

`$ npm i bruker-data-test`

Provide an array of bruker files zipped or path of root folder with bruker uncompressed files.

## Usage

```js
import { createReadStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { zippedFiles } from 'bruker-data-test';

const files = await zippedFiles(); // list of zip file names

const filename = 'aspirin-1h.zip';
const aspirin = zipped.find((entry) => entry.name === filename);

// Get the file buffer
const buffer = await aspirin.buffer();
// is a shortcut of
const buffer = await readFile(aspirin.path);

// get the file as a Stream
const stream = aspirin.stream();
// is a shortcut of
const stream = createReadStream(aspirin.path);
```

Other methods available for zipped files:

Async Generator, Useful for async iteration:

```typescript
import { zippedFilesAsyncEntries, zippedFilesEntries } from 'bruker-data-test';

for await (const entry of zippedFilesAsyncEntries()) {
  // do something with entry
}
```

Promise Generator, Useful to use with Iterators Helpers if available:

```typescript
import { cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { zippedFilesEntries } from 'bruker-data-test';
import { basename } from 'pathe';

const entries = await zippedFilesEntries();

const copyEntries = entries
  .filter((f) => f.name.startsWith('cyclosporin'))
  .map((f) => [f.path, join(process.cwd(), f.relativePath)])
  .map(([source, destination]) =>
    mkdir(basename(destination), { recursive: true }).then(() =>
      cp(source, destination),
    ),
  );
await Promise.allSettled(copyEntries);
```

Get the root path of uncompressed bruker experiments files

```js
import { coffeeDirectory } from 'bruker-data-test';

const root = coffeeDirectory();
```

## Data Files Structure

```
% tree data/zipped -L 2 data/flat/coffee
data/zipped
├── aspirin-1h-processed.zip
├── aspirin-1h.zip
├── cyclosporin
│   ├── cyclosporin_1h.zip
│   ├── cyclosporin_cosy.zip
│   ├── cyclosporin_hmbc.zip
│   ├── cyclosporin_hsqc.zip
│   └── inversionRecovery2D.zip
├── naphtoicAcid-1h.zip
├── nonUniformSampling
│   ├── cosy-nus.zip
│   └── hsqc-nus.zip
├── strychnine-1h.zip
└── t1rho-1H.zip
data/flat/coffee
├── UV1009_M1-1003-1002_6268712_73uEjPg4XR
│   ├── 10
│   ├── 20
│   ├── 21
│   ├── 22
│   ├── 23
│   ├── 98888
│   └── 99999
└── UV1010_M1-1003-1002_6268756_ErISKLIoeB
    ├── 10
    ├── 11
    ├── 12
    ├── 13
    ├── 98888
    └── 99999
```

NB: Each of subfolders in `data/flat/coffee` includes a `pdata` folder, `acqu` and `acqus` files.
And can include other files like `fid`, `audita.txt`, etc.

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/bruker-data-test.svg
[npm-url]: https://www.npmjs.com/package/bruker-data-test
[ci-image]: https://github.com/cheminfo/bruker-data-test/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/cheminfo/bruker-data-test/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/bruker-data-test.svg
[codecov-url]: https://codecov.io/gh/cheminfo/bruker-data-test
[download-image]: https://img.shields.io/npm/dm/bruker-data-test.svg
[download-url]: https://www.npmjs.com/package/bruker-data-test
