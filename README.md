# positional-flat-file-to-json

> Node module to convert a positional flat file to JSON

[![npm version](https://badge.fury.io/js/positional-flat-file-to-json.svg)](https://badge.fury.io/js/positional-flat-file-to-json)
[![Build Status](https://travis-ci.org/dankraus/positional-flat-file-to-json.svg?branch=master)](https://travis-ci.org/dankraus/positional-flat-file-to-json)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Converts a positional flat file to JSON with a simple schema description config.

Flat File:
```
02169Quincy              MA
11742Holtsville          NY
63112St. Louis           MO
10108New York            NY
```

Converted JSON
```
[
    {
        zip: '02169',
        city: 'Quincy',
        state: 'MA'
    },
    {
        zip: '11742',
        city: 'Holtsville',
        state: 'NY'
    },
    {
        zip: '63112',
        city: 'St. Louis',
        state: 'MO'
    },
    {
        zip: '10108',
        city: 'New York',
        state: 'NY'
    }
]
```

## Install
```
$ npm install positional-flat-file-to-json
```

## Examples
All methods return a Promise.

Example assumes the use of flat file given above.
```
var flatFileConverter = require('positional-flat-file-to-json');

// Configure the converter with a schema description
// Specify the column position the field starts at and the length/size of the field.
var sourceFileConfig = {
    zip: {
        columnPosition: 1,
        size: 5
    },
    city: {
        columnPosition: 6,
        size: 20
    },
    state: {
        columnPosition: 26,
        size: 2
    }
};

// Read a flat file from the file system and write to a JSON file
flatFileConverter.writeAsJsonFromFile(sourceFileConfig, '/fullpath/to/your/flatfile.txt', '/fullpath/to/your/output.json').then(() => {
    doSomeotherStuff();
});


// Read a flat file from the file system and return a JavaScript object
flatFileConverter.toJsonFromFile(sourceFileConfig, '/fullpath/to/your/flatfile.txt').then(convertedJson => {
    console.log(convertedJson[2].city); // St. Louis
});

// Pass in string or string buffer flat file data and return a JavaScript object.
conveflatFileConverterrter.toJson(sourceFileConfig, sourceString).then(convertedJson => {
    console.log(convertedJson[0].city); // Quincy
});

```
