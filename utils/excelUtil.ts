import * as XLSX from 'xlsx';
import path from 'path';

export function readExcel(filePath: string, sheetName: string){

    //convert relative path to absoult path
    const fullPath = path.resolve(__dirname,filePath);
    console.log('Full Path is ', fullPath);

    //get the file
    const workbook = XLSX.readFile(fullPath);

    //get the sheet
    const sheet = workbook.Sheets[sheetName];

    //convert the sheet to json
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}