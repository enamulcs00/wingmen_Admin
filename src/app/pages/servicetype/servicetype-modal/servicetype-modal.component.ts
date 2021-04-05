import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import base from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-servicetype-modal',
  templateUrl: './servicetype-modal.component.html',
  styleUrls: ['./servicetype-modal.component.scss']
})
export class ServicetypeModalComponent implements OnInit {

  @Input() isEdit: boolean;
  // @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();
  imageUrl=base;
  src: any;
  file: File;
  formData = new FormData();
  serviceTypeName:any;
  serviceTypeId:any;
  baseFare:any;
  perMileCost:any;
  perMinuteCost:any;
  isNoteShow:any=false;
  isEventService:any=false;
  isSingleTrip:any=false;
  isRoundTrip:any=false;

  flags = {
    isAdded: false,
    isUpdate: false
  };
  note: any;
 
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
  }

  onImageSelect(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file = file;
     
    } else {
      this.error('Selected file is not image.');
    }
  }

  onImageRemove() {
    this.src = null;
    $('#categoryFile').val('');
  }

  onEditSelect(data) {
    this.isEdit = true;
    this.serviceTypeName = data.serviceName;
    this.baseFare = data.baseFare;
    this.perMileCost = data.perMileCost;
    this.perMinuteCost = data.perMinuteCost;
    this.note = data.note;
    this.isNoteShow = data.isNoteShow;
    this.isEventService = data.isEventService;
    this.isSingleTrip = data.isSingleTrip;
    this.isRoundTrip = data.isRoundTrip;
    this.serviceTypeId = data._id;
    this.src = `${this.imageUrl}${data.image}`;
    // this.formData.append('id', data._id);
    document.getElementById('openServiceTypeModal').click();
  }

  addServiceType() {
    if(!this.file) return this.errorToast('Please add image first')
    if(this.serviceTypeName.trim()=="") return this.errorToast('Please enter name')
     this.flags.isAdded = true;
     this.formData.append('image', this.file);
     this.formData.append('serviceName',this.serviceTypeName);
     this.formData.append('baseFare',this.baseFare);
     this.formData.append('perMileCost',this.perMileCost);
     this.formData.append('perMinuteCost',this.perMinuteCost);
     this.formData.append('note',this.note)
     this.formData.append('isNoteShow',this.isNoteShow);
     this.formData.append('isEventService',this.isEventService)
     this.formData.append('isRoundTrip',this.isRoundTrip)
     this.formData.append('isSingleTrip',this.isSingleTrip)

    this.api.addServiceType(this.formData).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
       this.formData=new FormData();
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Vehicle Type added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }

  editServiceType() {
    if(this.serviceTypeName.trim()=="") return this.errorToast('Please enter name')
    this.flags.isUpdate = true;
    this.formData.append('serviceName',this.serviceTypeName);
    this.formData.append('baseFare',this.baseFare);
    this.formData.append('perMileCost',this.perMileCost);
    this.formData.append('perMinuteCost',this.perMinuteCost);
   this.formData.append('_id',this.serviceTypeId);
    this.formData.append('note',this.note);
    this.formData.append('isNoteShow',this.isNoteShow);
    this.formData.append('isEventService',this.isEventService)
    this.formData.append('isRoundTrip',this.isRoundTrip)
    this.formData.append('isSingleTrip',this.isSingleTrip)
    this.api.updateServiceType(this.formData).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        this.formData = new FormData();
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Service Type updated successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  onCancel() {
    this.serviceTypeName='';
    this.note=''
    this.file = null;
    this.src = null;
    this.formData = new FormData(); 
    $('#categoryFile').val('');
    this.isEdit = false;
    document.getElementById('closeServiceTypeModal').click();
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
