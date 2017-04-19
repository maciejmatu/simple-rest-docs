const parser = require('comment-parser');
const globby = require('globby');
const util = require('util');
const fs = require('fs');
const _ = require('underscore');

let options = {
  parsers: [
    parser.PARSERS.parse_tag,
    (str, data) => {
      return {source: ' ', data: {description: str.substring(1)}};
    }
  ],
  output: './DOCUMENT.md',
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
  let tmplObject = {};

  block.forEach(comment => comment.tags.forEach(tag => {
    tmplObject[tag.tag] = tmplObject[tag.tag] || [];
    tmplObject[tag.tag].push(tag.description);
  }));

  const compiled = _.template(fs.readFileSync("./template.md", "utf8"));

  return compiled({
    data: tmplObject,
    isDefined: val => !_.isUndefined(val)
  });
}

module.exports = function(opts, fn) {
  options = Object.assign({}, options, opts);
  globby(opts.files).then(resolveAll);

  if (_.isFunction(fn)) fn();
}