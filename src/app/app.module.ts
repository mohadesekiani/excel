import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ImportExcelFileComponent } from './import-excel-file/import-excel-file.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportExcelFileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
MatButtonModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
