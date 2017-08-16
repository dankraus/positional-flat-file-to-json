'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToJson = exports.writeAsJson = undefined;

var _fsExtra = require('fs-extra');

var fs = _interopRequireWildcard(_fsExtra);

var _readline = require('readline');

var readline = _interopRequireWildcard(_readline);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//@ts-check
var writeAsJson = exports.writeAsJson = function writeAsJson(sourceFileConfig, sourceFilepath, outputFilepath) {
  return new Promise(function (resolve, reject) {
    var convertedData = [];
    var rd = readline.createInterface({ input: fs.createReadStream(sourceFilepath) });

    rd.on('line', function (line) {
      var convertedLine = convertLine(sourceFileConfig, line);
      convertedData.push(convertedLine);
    });

    rd.on('close', function () {
      fs.outputJson(outputFilepath, convertedData).then(function () {
        resolve();
      });
    });
  });
};

var convertToJson = exports.convertToJson = function convertToJson(sourceFileConfig, sourceFilepath, outputFilepath) {
  return new Promise(function (resolve, reject) {
    var convertedData = [];
    var rd = readline.createInterface({ input: fs.createReadStream(sourceFilepath) });

    rd.on('line', function (line) {
      var convertedLine = convertLine(sourceFileConfig, line);
      convertedData.push(convertedLine);
    });

    rd.on('close', function () {
      resolve(convertedData);
    });
  });
};

function convertLine(sourceFileConfig, line) {
  var convertedLine = {};

  for (var col in sourceFileConfig) {
    convertedLine[col] = line.substr(sourceFileConfig[col]["columnPosition"] - 1, sourceFileConfig[col]['size']).trim();
  }

  return convertedLine;
}