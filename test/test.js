//@ts-check
import * as mocha from 'mocha';
import * as path from 'path';
import * as assert from 'assert';
import * as converter from '../src/index.js';
import * as fs from 'fs-extra';

describe('Converter', function () {
  const sourceFileConfig = {
    "zip": {
        "columnPosition": 1,
        "size": 5
    },
    "city": {
        "columnPosition": 6,
        "size": 20
    },
    "state": {
        "columnPosition": 26,
        "size": 2
    }
  };

  const sourceFilepath = path.join(__dirname, 'test-flat-file.txt');
  const outputFilepath = path.join(__dirname, 'tmp', 'converted-file.Json');

  const expectedJson = [
    {
      "zip": "02169",
      "city": "Quincy",
      "state": "MA"
    },
    {
        "zip": "11742",
        "city": "Holtsville",
        "state": "NY"
    },
    {
        "zip": "63112",
        "city": "St. Louis",
        "state": "MO"
    },
    {
        "zip": "10108",
        "city": "New York",
        "state": "NY"
    }
  ];
  
  it('should read file and write converted Json to file', function() {
    return converter.writeAsJsonFromFile(sourceFileConfig, sourceFilepath, outputFilepath).then(function() {
      return fs.readJson(outputFilepath).then(function(writtenJson) {
        assert.deepEqual(writtenJson, expectedJson);
      });
    });
  });

  it('should read file and return converted Json ', function() {
    return converter.convertToJsonFromFile(sourceFileConfig, sourceFilepath, outputFilepath).then(function(result) {
      assert.deepEqual(result, expectedJson);
    });
  });

});