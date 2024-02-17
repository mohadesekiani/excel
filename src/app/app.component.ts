import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';

@Component({
  selector: 'app-root',
  template: `
    <button mat-button (click)="openDialog()">Open Modal</button>
  `,
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ExampleDialogComponent);

    // در اینجا می‌توانید به رویدادات مربوط به مدال دسترسی داشته باشید
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
