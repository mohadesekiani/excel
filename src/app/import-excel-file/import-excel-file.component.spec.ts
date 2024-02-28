import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExcelFileComponent } from './import-excel-file.component';

describe('ImportExcelFileComponent', () => {
  let component: ImportExcelFileComponent;
  let fixture: ComponentFixture<ImportExcelFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportExcelFileComponent]
    });
    fixture = TestBed.createComponent(ImportExcelFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
