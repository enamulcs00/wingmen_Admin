import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import base from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-state-modal',
  templateUrl: './state-modal.component.html',
  styleUrls: ['./state-modal.component.scss']
})
export class StateModalComponent implements OnInit {

  @Input() isEdit: boolean;
  // @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();

  stateName:any;
  id:any;

  flags = {
    isAdded: false,
    isUpdate: false
  };
 
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
  }

  onEditSelect(data) {
     this.stateName=data.stateName
     this.id=data._id;
    this.isEdit = true;
    
    // this.formData.append('id', data._id);
    document.getElementById('openStateModal').click();
  }

  addState() {
    if(this.stateName.trim()=="") return this.errorToast('Please enter name')
     this.flags.isAdded = true;
  
    this.api.addState({stateName:this.stateName}).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.stateName='';
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('State added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }

   editState() {
    if(this.stateName.trim()=="") return this.errorToast('Please enter name')
    this.flags.isUpdate = true;
    const data={
      stateName:this.stateName,
      _id:this.id
    }
     this.api.editState(data).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('State updated successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  onCancel() {
    this.stateName='';
    this.isEdit = false;
    document.getElementById('closeStateModal').click();
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
