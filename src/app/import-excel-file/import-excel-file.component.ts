import { Component } from '@angular/core';
import * as Excel from 'exceljs';

@Component({
  selector: 'app-import-excel-file',
  templateUrl: './import-excel-file.component.html',
  styleUrls: ['./import-excel-file.component.css']
})
export class ImportExcelFileComponent {
  headers: string[] = [];
  rows: any[] = [];


  excelData: any[] = [];

  readExcel(event: any) {
    const workbook = new Excel.Workbook();
    const target: DataTransfer = <DataTransfer>(event.target);
  
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
  
    const arrayBuffer = new Response(target.files[0]).arrayBuffer();

    arrayBuffer.then(data => {
      workbook.xlsx.load(data).then(() => {
        const worksheet = workbook.getWorksheet(1);
        if (worksheet) {
          const firstRow = worksheet.getRow(1);
          firstRow.eachCell((cell, colNumber) => {
            const cellValue = cell.value;
            if (cellValue) {
              this.headers.push(cellValue.toString());
            }
          });
        
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) { // Skip header row
              const rowData: any[] = [];
              row.eachCell((cell, colNumber) => {
                rowData.push(cell.value);
              });
              this.excelData.push(rowData);
            }
          });
        } else {
          console.error('Worksheet not found.');
        }
      });
    });
  }
  
  
}
