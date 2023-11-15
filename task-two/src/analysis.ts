import fs from 'fs';
import EmailValidator from 'email-validator';

interface AnalysisResult {
  validDomains: string[];
  totalEmailsParsed: number;
  totalValidEmails: number;
  domainCategories: Record<string, number>;
}

function analyseFiles(inputPaths: string[], outputPath: string): void {
  let allEmails = '';
  let allEmailsArray: string[] = [];
  const trueEmailsArray: string[] = [];
  const validEmailsArray: string[] = [];
  const validDomainsArray: string[] = [];
  let domainOccurrences: Record<string, number>;

  inputPaths.forEach((filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    allEmails += data;
  });

  allEmailsArray = allEmails.split('\n');
  for (let i = 1; i < allEmailsArray.length - 1; i++) {
    trueEmailsArray.push(allEmailsArray[i]);
  }

  trueEmailsArray.forEach((email) => {
    if (EmailValidator.validate(email)) {
      validEmailsArray.push(email);
    }
  });

  for (let j = 0; j < validEmailsArray.length; j++) {
    const splitValid = validEmailsArray[j].split('@');
    validDomainsArray.push(splitValid[1]);
  }

  // eslint-disable-next-line prefer-const
  domainOccurrences = {};
  validDomainsArray.forEach((domain) => {
    if (domainOccurrences[domain]) {
      domainOccurrences[domain]++;
    } else {
      domainOccurrences[domain] = 1;
    }
  });

  const uniqueValidDomainsArray = Array.from(
    new Set<string>(validDomainsArray),
  );

  const result: AnalysisResult = {
    validDomains: uniqueValidDomainsArray,
    totalEmailsParsed: trueEmailsArray.length,
    totalValidEmails: validEmailsArray.length,
    domainCategories: domainOccurrences,
  };

  console.log(result);

  fs.writeFileSync(outputPath, JSON.stringify(result), 'utf-8');
  console.log('Result saved to', outputPath);
}

export default analyseFiles;
