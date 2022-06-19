import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmUpdateComponent } from './modal-confirm-update.component';

describe('ModalConfirmUpdateComponent', () => {
  let component: ModalConfirmUpdateComponent;
  let fixture: ComponentFixture<ModalConfirmUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
