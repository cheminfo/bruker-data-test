const { readFileSync } = require("fs");
const { join } = require("path");

const toc = JSON.parse(readFileSync(join(__dirname, 'toc.json')));
let bruker = {};
for (let file of toc){
  let name = file.filename;
  bruker[name] = readFileSync(join(__dirname, file.url)).toString();
}
module.exports = {
  bruker,
};

