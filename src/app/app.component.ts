import { Component } from '@angular/core';
import * as ExcelJS from 'exceljs';

interface Address {
  street: string;
  city: string;
  country: string;
}

interface Person {
  name: string;
  age: number;
  address: Address;
  user:any[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  excelData: Person[] = [
    { name: "John", age: 30, address: { street: "123 Main St", city: "New York", country: "USA" },
    user: [
      {
          "title": "دامدار",
          "businessRoleId": 104,
          "userAccountId": 18,
      },
      {
          "title": "دامدار",
          "businessRoleId": 104,
          "userAccountId": 18,         
          }],
          
      },

    { name: "Alice", age: 25, address: { street: "456 Elm St", city: "Los Angeles", country: "USA" },
    user: [
      {
          "title": "کشاورز",
          "businessRoleId": 104,
          "userAccountId": 18,
      },
      {
          "title": "کشاورز",
          "businessRoleId": 104,
          "userAccountId": 18,         
          }], },
    { name: "Bob", age: 35, address: { street: "789 Oak St", city: "Chicago", country: "USA" }, 
           user: [
        {
            "title": "دامدار",
            "businessRoleId": 104,
            "userAccountId": 18,
        },
        {
            "title": "دامدار",
            "businessRoleId": 104,
            "userAccountId": 18,         
            }], },
    { name: "Emily", age: 28, address: { street: "321 Pine St", city: "San Francisco", country: "USA" }, 
    user: [
      {
          "title": "دامدار",
          "businessRoleId": 104,
          "userAccountId": 18,
      },
      {
          "title": "دامدار",
          "businessRoleId": 104,
          "userAccountId": 18,         
          }],}
  ];

  constructor() {}

  async exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('اطلاعات کاربری');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Age', key: 'age', width: 10 },
      { header: 'City', key: 'city', width: 20 },
      { header: 'Street', key: 'street', width: 30 },
      { header: 'Country', key: 'country', width: 15 },
      { header: 'Full Address', key: 'fullAddress', width: 40 },
      { header: 'User Title 1', key: 'userTitle1', width: 25 },
      { header: 'User Business Role Id 1', key: 'userBusinessRoleId1', width: 25 },
      { header: 'User Account Id 1', key: 'userAccountId1', width: 25 },
      { header: 'User Title 2', key: 'userTitle2', width: 25 },
      { header: 'User Business Role Id 2', key: 'userBusinessRoleId2', width: 25 },
      { header: 'User Account Id 2', key: 'userAccountId2', width: 25 }
    ];


   // اضافه کردن داده‌ها به ورک‌شیت
   this.excelData.forEach((person,index) => {

    const rowData: any = {
      index:index,
      name: person.name,
      age: person.age,
      street: person.address.street,
      city: person.address.city,
      country: person.address.country,
      fullAddress: `${person.address.street}, ${person.address.city}, ${person.address.country}`
    };

    if (person.user && person.user.length > 0) {
      person.user.forEach((user, userIndex) => {
        rowData[`userTitle${userIndex + 1}`] = user.title;
        rowData[`userBusinessRoleId${userIndex + 1}`] = user.businessRoleId;
        rowData[`userAccountId${userIndex + 1}`] = user.userAccountId;
      });
    }

    worksheet.addRow(rowData);
  });

    const buffer = await workbook.xlsx.writeBuffer();
    this.saveExcelFile(buffer, 'excel_data.xlsx');
  }

  // یک فایل اکسل ایجاد می‌کند و آن را به کاربر دانلود می‌کند

  saveExcelFile(buffer: ArrayBuffer, fileName: string) {
    // برای ایجاد یک لینک قابل دانلود 
    const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // یک آدرس ایجاد می‌شود 
    const url = window.URL.createObjectURL(data);

    // برای ایجاد یک لینک دانلود 
    const a = document.createElement('a');

    // آدرس URL که متعلق به فایل اکسل است را به عنوان مقصد لینک `a` قرار می‌دهد.
    a.href = url;

    // نام فایلی که کاربر آن را دریافت می‌کند تنظیم می‌شود
    a.download = fileName;

    // المان `a` به بدنه سند (Document) اضافه می‌شود
    document.body.appendChild(a);
    // کلیک بر روی المان `a` که به این معناست که کاربر فایل را دانلود کند.
    a.click();

    // پس از گذشت 100 میلی‌ثانیه، المان `a` از بدنه سند حذف شده و آدرس URL آزاد شده تا حافظه‌ی مرورگر را آزاد کند
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}
