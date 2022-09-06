# bruker-data-test

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

.

## Installation

`$ npm i bruker-data-test`

Provide FileList of bruker files zipped or unzipped

## Usage

```js
import { getList, getFile, getZipped } from 'bruker-data-test';

const listOfFilenames = await getList(); //list of zip file names

const filename = 'aspirin-1h.zip';
const zipped = getZipped();
const aspirin = zipped.find((entry) => entry.name === filename);
const buffer = await aspirin.arrayBuffer();
//or
const zipBuffer = await getData(filename);

```

File list of a folder with two bruker samples
```js
import { getCoffee } from 'bruker-data-test';
const fileList = await getCoffee();
```
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
