import * as readline from 'readline';
import * as fs from 'fs-extra';

export interface IFlatFileConfig {
    [fieldName: string]: IFieldConfig
}

export interface IFieldConfig {
	columnPosition: number,
	size: number
}

export interface IConvertedLineRecord {
    [fieldName: string]: any
}

/**
 * Converts a positional flat file from a filepath and writes the converted JSON to a file
 * @param flatFileConfig a IFlatFileConfig that defines the field names and their locations in the flat file
 * @param sourceFilepath a String filepath to the file to be converted
 * @param outputFilepath a String filepath to where the converted JSON will be written
 */
export const writeAsJsonFromFile = (flatFileConfig: IFlatFileConfig, sourceFilepath: string, outputFilepath: string) : Promise<void> => new Promise(resolve => {
	const convertedData: Array<IConvertedLineRecord> = [];
	const rd = readline.createInterface({input: fs.createReadStream(sourceFilepath)});

	rd.on('line', line => {
		const convertedLine = convertLine(flatFileConfig, line);
		convertedData.push(convertedLine);
	});

	rd.on('close', () => {
		fs.outputJson(outputFilepath, convertedData).then(() => {
			resolve();
		});
	});
});

/**
 * Converts a positional flat file from a filepath and returns the converted JSON
 * @param flatFileConfig a IFlatFileConfig that defines the field names and their locations in the flat file
 * @param sourceFilepath a String filepath to the file to be converted
 */
export const toJsonFromFile = (flatFileConfig: IFlatFileConfig, sourceFilepath: string) : Promise<Array<IConvertedLineRecord>> => new Promise(resolve => {
	const convertedData: Array<IConvertedLineRecord> = [];
	const rd = readline.createInterface({input: fs.createReadStream(sourceFilepath)});

	rd.on('line', line => {
		const convertedLine = convertLine(flatFileConfig, line);
		convertedData.push(convertedLine);
	});

	rd.on('close', () => {
		resolve(convertedData);
	});
});

/**
 * Converts positional flat file string data and returns the converted JSON
 * @param flatFileConfig a IFlatFileConfig that defines the field names and their locations in the flat file
 * @param sourceString a String containing positional flat file data
 */
export const toJson = (flatFileConfig: IFlatFileConfig, sourceString: string) : Promise<Array<IConvertedLineRecord>> => new Promise(resolve => {
	const lines = sourceString.match(/[^\r\n]+/g);
	let convertedData: Array<IConvertedLineRecord> = [];

	if (lines) {
		convertedData = lines.map(line => {
			return convertLine(flatFileConfig, line);
		});
	}

	resolve(convertedData);
});

/**
 * Converts a row of flat positional data to JSON
 * @param flatFileConfig a IFlatFileConfig that defines the field names and their locations in the flat file
 * @param line a String containing one record of flat positional data
 */
function convertLine(flatFileConfig: IFlatFileConfig, line: string): IConvertedLineRecord {
	const convertedLine: IConvertedLineRecord = {};

	for (const col in flatFileConfig) {
		if (Object.prototype.hasOwnProperty.call(flatFileConfig, col)) {
			convertedLine[col] = line.substr(flatFileConfig[col].columnPosition - 1, flatFileConfig[col].size)
				.trim();
		}
	}

	return convertedLine;
}