//@ts-check
import * as fs from 'fs-extra';
import * as readline from 'readline';

export let writeAsJsonFromFile = (sourceFileConfig, sourceFilepath, outputFilepath) => new Promise((resolve, reject) => {
  let convertedData = [];
  let rd = readline.createInterface({input: fs.createReadStream(sourceFilepath)});
 
  rd.on('line', (line) => {
    const convertedLine = convertLine(sourceFileConfig, line);
    convertedData.push(convertedLine);
  });

  rd.on('close', () => {
     fs.outputJson(outputFilepath, convertedData).then(() => {
      resolve();
    });
  })
});

export let convertToJsonFromFile = (sourceFileConfig, sourceFilepath) => new Promise((resolve, reject) => {
  let convertedData = [];
  let rd = readline.createInterface({input: fs.createReadStream(sourceFilepath)});
 
  rd.on('line', (line) => {
    const convertedLine = convertLine(sourceFileConfig, line);
    convertedData.push(convertedLine);
  });

  rd.on('close', () => {
    resolve(convertedData);
  })
});

function convertLine(sourceFileConfig, line) {
  let convertedLine = {};
  
  for(let col in sourceFileConfig) {
    convertedLine[col] = line.substr(sourceFileConfig[col]["columnPosition"] -1, sourceFileConfig[col]['size']).trim();
  }

  return convertedLine;
}

