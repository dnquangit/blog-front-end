import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-update',
  templateUrl: './modal-confirm-update.component.html',
  styleUrls: ['./modal-confirm-update.component.css']
})
export class ModalConfirmUpdateComponent implements OnInit {
  @Input() storeName: string = "";

  content:string = "";
  clearOldCart:boolean = false;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.content = `Adding this item from will clear your basket of items from ${this.storeName}. Proceed?`;
  }

  closeModal(acceptClearCart:boolean): void {
    this.clearOldCart = acceptClearCart;
    this.activeModal.close('Close click');
  }

}
