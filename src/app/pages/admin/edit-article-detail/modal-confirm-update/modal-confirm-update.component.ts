import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-update',
  templateUrl: './modal-confirm-update.component.html',
  styleUrls: ['./modal-confirm-update.component.css']
})
export class ModalConfirmUpdateComponent implements OnInit {
  @Input() modalTitle: string = "";

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  closeModal(): void {
    this.activeModal.close('Close click');
  }

}
