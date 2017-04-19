const parser = require('comment-parser');
const globby = require('globby');
const util = require('util');
const fs = require('fs');
const _ = require('underscore');

let TEMPLATES = require('./template');

let options = {
  parsers: [
    parser.PARSERS.parse_tag,
    (str, data) => {
      return {source: ' ', data: {description: str.substring(1)}};
    }
  ],
  output: './README.md',
  files: []
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

  fs.writeFileSync(options.output, generateTemplate(_.flatten(allFiles)), 'utf-8');
}

function generateTemplate(block) {
  let compiledString = '';

  block.forEach(comment => {
    comment.tags.forEach((tag) => {
      if (_.isFunction(TEMPLATES[tag.tag])) return;

      if (_.isFunction(TEMPLATES['pre_' + tag.tag]) && !TEMPLATES['pre' + tag.tag + '_called']) {
        TEMPLATES['pre_' + tag.tag + '_called'] = true;
        TEMPLATES['pre_' + tag.tag]();
      }

      console.log(TEMPLATES);

      compiledString += TEMPLATES[tag.tag](tag);
    });
  });

  return compiledString;
}

module.exports = {
  generate: (opts, fn) => {
    options = Object.assign({}, options, opts);
    globby(opts.files).then(resolveAll);

    if (_.isFunctions(fn)) fn();
  }
}