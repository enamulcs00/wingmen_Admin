 import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import base from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-vehicletype-modal',
  templateUrl: './vehicletype-modal.component.html',
  styleUrls: ['./vehicletype-modal.component.scss']
})
export class VehicletypeModalComponent implements OnInit {

  @Input() isEdit: boolean;
  // @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();

  vehicleTypeName:any;
  id:any;

  flags = {
    isAdded: false,
    isUpdate: false
  };
 
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
  }

  onEditSelect(data) {
     this.vehicleTypeName=data.vehicleTypeName
     this.id=data._id;
    this.isEdit = true;
    
    // this.formData.append('id', data._id);
    document.getElementById('openVehicleTypeModal').click();
  }

  addVehicleType() {
    if(this.vehicleTypeName.trim()=="") return this.errorToast('Please enter name')
     this.flags.isAdded = true;
  
    this.api.addVehicleType({vehicleTypeName:this.vehicleTypeName}).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.vehicleTypeName='';
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Vehicle Type added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }

  editVehicleType() {
    if(this.vehicleTypeName.trim()=="") return this.errorToast('Please enter name')
    this.flags.isUpdate = true;
    const data={
      vehicleTypeName:this.vehicleTypeName,
      _id:this.id
    }
     this.api.updateVehicleType(data).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Vehicle Type updated successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  onCancel() {
    this.vehicleTypeName='';
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
