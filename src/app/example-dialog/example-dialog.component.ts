import { Component } from '@angular/core';

@Component({
  selector: 'app-example-dialog',
  template: `
    <h1 mat-dialog-title>Modal Title</h1>
    <div mat-dialog-content>
      Modal content goes here.
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Close</button>
    </div>
  `,
})
export class ExampleDialogComponent {
  constructor() {}

  closeDialog(): void {
    // این متد برای بستن مدال استفاده می‌شود
  }
}
