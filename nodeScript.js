const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const recursive = require('recursive-readdir-synchronous');

let path = join(__dirname, "data");

let parentDir = join(__dirname);
let files = recursive(path).map((file) =>
  file.replace(parentDir, '.'),
);

let toc = [];

for (let file of files) {
  let parts = file.split('/');
  toc.push({
    filename: parts[2],
    url: file,
  });
}

writeFileSync(
    join(__dirname, './toc.json'),
    `${JSON.stringify(toc, undefined, 2)}`,
  );
  
console.log(JSON.stringify(toc, undefined, 2));