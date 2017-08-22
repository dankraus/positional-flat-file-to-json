// @ts-check
import * as assert from 'assert';
import * as path from 'path';
import * as mocha from 'mocha';
import * as fs from 'fs-extra';
import * as converter from '../src/index';

describe('Converter', () => {
	const sourceFileConfig = {
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

	const sourceFilepath = path.join(__dirname, 'test-flat-file.txt');
	const sourceString = fs.readFileSync(sourceFilepath).toString();
	const outputFilepath = path.join(__dirname, 'tmp', 'converted-file.Json');

	const expectedJson = [
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
	];

	it('should read file and write converted Json to file', () => {
		return converter.writeAsJsonFromFile(sourceFileConfig, sourceFilepath, outputFilepath).then(() => {
			return fs.readJson(outputFilepath).then(writtenJson => {
				assert.deepEqual(writtenJson, expectedJson);
			});
		});
	});

	it('should read file and return converted Json', () => {
		return converter.convertToJsonFromFile(sourceFileConfig, sourceFilepath).then(result => {
			assert.deepEqual(result, expectedJson);
		});
	});

	it('should return converted Json', () => {
		return converter.convertToJson(sourceFileConfig, sourceString).then(result => {
			assert.deepEqual(result, expectedJson);
		});
	});
});
