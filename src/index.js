// @ts-check
import * as readline from 'readline';
import * as fs from 'fs-extra';

export const writeAsJsonFromFile = (sourceFileConfig, sourceFilepath, outputFilepath) => new Promise(resolve => {
	const convertedData = [];
	const rd = readline.createInterface({input: fs.createReadStream(sourceFilepath)});

	rd.on('line', line => {
		const convertedLine = convertLine(sourceFileConfig, line);
		convertedData.push(convertedLine);
	});

	rd.on('close', () => {
		fs.outputJson(outputFilepath, convertedData).then(() => {
			resolve();
		});
	});
});

export const convertToJsonFromFile = (sourceFileConfig, sourceFilepath) => new Promise(resolve => {
	const convertedData = [];
	const rd = readline.createInterface({input: fs.createReadStream(sourceFilepath)});

	rd.on('line', line => {
		const convertedLine = convertLine(sourceFileConfig, line);
		convertedData.push(convertedLine);
	});

	rd.on('close', () => {
		resolve(convertedData);
	});
});

export const convertToJson = (sourceFileConfig, sourceString) => new Promise(resolve => {
	const lines = sourceString.match(/[^\r\n]+/g);

	const convertedData = lines.map(line => {
		return convertLine(sourceFileConfig, line);
	});

	resolve(convertedData);
});

function convertLine(sourceFileConfig, line) {
	const convertedLine = {};

	for (const col in sourceFileConfig) {
		if (Object.prototype.hasOwnProperty.call(sourceFileConfig, col)) {
			convertedLine[col] = line.substr(sourceFileConfig[col].columnPosition - 1, sourceFileConfig[col].size)
				.trim();
		}
	}

	return convertedLine;
}
