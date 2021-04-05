import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import base from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-eventtype-modal',
  templateUrl: './eventtype-modal.component.html',
  styleUrls: ['./eventtype-modal.component.scss']
})
export class EventtypeModalComponent implements OnInit {

  @Input() isEdit: boolean;
  // @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();

  eventTypeName: any;
  id: any;

  flags = {
    isAdded: false,
    isUpdate: false
  };

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
  }

  onEditSelect(data) {
    this.eventTypeName = data.eventName
    this.id = data._id;
    this.isEdit = true;

    document.getElementById('openEventTypeModal').click();
  }

  addEventType() {
    if (this.eventTypeName.trim() == "") return this.errorToast('Please enter name')
    this.flags.isAdded = true;

    this.api.addEventType({ eventName: this.eventTypeName }).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.eventTypeName = '';
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Event Type added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }

  editEventType() {
    if (this.eventTypeName.trim() == "") return this.errorToast('Please enter name')
    this.flags.isUpdate = true;
    const data = {
      eventName: this.eventTypeName,
      _id: this.id
    }
    this.api.editEventType(data).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Event Type updated successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  onCancel() {
    this.eventTypeName = '';
    this.isEdit = false;
    document.getElementById('closeEventTypeModal').click();
  }
  error = message => {
    this.errorToast(message);
  }


  successToast(message) {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }

  errorToast(message) {
    this.toaster.errorToastr(message);
  }


}