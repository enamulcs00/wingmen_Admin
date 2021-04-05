import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import base from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-transmissiontype-modal',
  templateUrl: './transmissiontype-modal.component.html',
  styleUrls: ['./transmissiontype-modal.component.scss']
})
export class TransmissiontypeModalComponent implements OnInit {

  @Input() isEdit: boolean;
  // @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();

  transmissionTypeName:any;
  id:any;

  flags = {
    isAdded: false,
    isUpdate: false
  };
 
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
  }

  onEditSelect(data) {
     this.transmissionTypeName=data.transmissionTypeName
     this.id=data._id;
    this.isEdit = true;
    
    // this.formData.append('id', data._id);
    document.getElementById('openVehicleTypeModal').click();
  }

  addTransmissionType() {
    if(this.transmissionTypeName.trim()=="") return this.errorToast('Please enter name')
     this.flags.isAdded = true;
  
    this.api.addTransmissionType({transmissionTypeName:this.transmissionTypeName}).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.transmissionTypeName='';
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Transmission Type added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }

  editTransmissionType() {
    if(this.transmissionTypeName.trim()=="") return this.errorToast('Please enter name')
    this.flags.isUpdate = true;
    const data={
      transmissionTypeName:this.transmissionTypeName,
      _id:this.id
    }
     this.api.editTransmissionType(data).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Transmission updated successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  onCancel() {
    this.transmissionTypeName='';
    this.isEdit = false;
    document.getElementById('closeVehicleTypeModal').click();
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
