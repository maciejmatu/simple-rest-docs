const parser = require('comment-parser');
const globby = require('globby');
const util = require('util');
const fs = require('fs');
const _ = require('underscore');
const tidy = require('tidy-markdown');
const beautify = require('node-beautify').beautifyJs;

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
  let finalString = '';

  allFiles = allFiles.filter(arr => { return arr.length > 0 });

  _.flatten(allFiles).forEach((comment) => {
    finalString += generateTemplate(comment);
  });

  fs.writeFileSync(options.output, finalString, 'utf-8');
}

function generateTemplate(comment) {
  let tmplObject = {};

  comment.tags.forEach(tag => {
    tmplObject[tag.tag] = tmplObject[tag.tag] || [];
    tmplObject[tag.tag].push(tag.description);
  });

  const compiled = _.template(fs.readFileSync(__dirname + '/template.md', 'utf8'));

  return compiled({
    data: tmplObject,
    beautify: beautify,
    isDefined: val => !_.isUndefined(val)
  });
}

module.exports = function(opts, fn) {
  options = Object.assign({}, options, opts);
  globby(opts.files).then(resolveAll);

  if (_.isFunction(fn)) fn();
}