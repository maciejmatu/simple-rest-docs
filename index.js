const parser = require('comment-parser');
const globby = require('globby');
const util = require('util');
const fs = require('fs');
const template = require('./template');
const _ = require('underscore');

const files = [
  'index.js',
  'router.js',
  'routes/**/*.js',
  'models/**/*.js',
  'config/**/*.js',
  'controllers/**/*.js'
];

const options = {
  parsers: [
    parser.PARSERS.parse_tag,
    (str, data) => {
      return {source: ' ', data: {description: str.substring(1)}};
    }
  ]
}

function resolveAll(files) {
  let promises = files.map(parseFile);

  Promise.all(promises).then(saveToFile);
}

function parseFile(file, i) {
  return new Promise((resolve, reject) => {

    parser.file(file, options, (err, done) => {
      if (err) {
        reject(err);
      } else {
        resolve(done);
      }
    });

  })
}

function saveToFile(allFiles) {
  allFiles = allFiles.filter(arr => { return arr.length > 0 });

  fs.writeFileSync('./CUSTOMDOCS.json', template.generate(_.flatten(allFiles)), 'utf-8');
}

globby(files).then(resolveAll);