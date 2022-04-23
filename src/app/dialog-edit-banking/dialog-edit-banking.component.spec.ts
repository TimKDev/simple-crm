import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBankingComponent } from './dialog-edit-banking.component';

describe('DialogEditBankingComponent', () => {
  let component: DialogEditBankingComponent;
  let fixture: ComponentFixture<DialogEditBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditBankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
