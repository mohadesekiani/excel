import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import * as Excel from 'exceljs';

@Component({
  selector: 'app-import-excel-file',
  templateUrl: './import-excel-file.component.html',
  styleUrls: ['./import-excel-file.component.css']
})
export class ImportExcelFileComponent implements OnInit {
  headers: string[] = [];
  rows: any[] = [];
  form: any
  excelData: any[] = [];
  visible = false
  constructor(private fb: FormBuilder) { }

  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      nationalCode: ['', [Validators.required, Validators.minLength(10)]],
      skills: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control('')
      ],)
    });
  }
  ngOnInit() {
    this.buildForm();
    console.log(this.form);

  }

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
          this.visible = true
          firstRow.eachCell((cell, colNumber) => {
            const cellValue = cell.value;
            if (cellValue) {
              // this.headers.unshift('rowNumber');

              this.headers.push(cellValue.toString());


            }

          });
          this.headers.unshift("ردیف");
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
              const rowData: any[] = [];
              row.eachCell((cell, colNumber) => {
                rowData.push(cell.value);
              });
              this.excelData.push(rowData);
              rowData.unshift(rowNumber - 1);

              this.form.get('skills').setValue([this.excelData[0][4], this.excelData[0][5], this.excelData[0][6]]);
              this.form.get('name').setValue(this.excelData[0][1]);
              this.form.get('age').setValue(this.excelData[0][2]);
              this.form.get('nationalCode').setValue(this.excelData[0][3]);

              console.log(this.form);

            }
          });
        } else {
          console.error('Worksheet not found.');
        }
      });
    });
  }


}
