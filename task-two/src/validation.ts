/**
`* Stretch goal - Validate all the emails in this files and output the report
*
* @param {string[]} inputPath An array of csv files to read
* @param {string} outputFile The path where to output the report
*/

import * as dns from 'dns';
import * as fs from 'fs';

async function validateEmailAddresses(
  inputFilePath: string[],
  outputFilePath: string,
) {
  const another_input = inputFilePath[0];
  async function convertCsvToJson(convertInput: string) {
    //const passthis = JSON.stringify(inputFilePath)
    const passthis = another_input;
    const csvfile: string = await fs.promises.readFile(passthis, {
      encoding: 'utf-8',
    });

    const arr = csvfile.split('\n');
    const newArray = [];
    const key = arr[0].split(',');
    for (const item in arr) {
      const data = arr[item].split(',');
      const object: { [key: string]: string } = {};
      for (const value in data) {
        object[key[value].trim()] = data[value].trim();
      }
      newArray.push(object);
    }
    return newArray;
  }

  const arrayOfConvertedEmail = await convertCsvToJson(another_input);
  const analysedResult = arrayOfConvertedEmail.filter((obj) => {
    return obj.Emails !== 'Emails' && obj.Emails !== '';
  });

}

export default validateEmailAddresses;
