import { Component, OnInit, ViewChild } from '@angular/core';
 import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import { DeleteBody } from 'src/app/requests/delete-body';
import { ThemePalette } from '@angular/material/core';
import { StateModalComponent } from './state-modal/state-modal.component';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  deleteBody=new DeleteBody();
  serialNumber = 0;
  totalItems: number;
  currentPage: number;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  flags = {
    isEdit: false
  };

  @ViewChild(StateModalComponent, { static: false }) public modalComponent: StateModalComponent;
  stateList: any;
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.currentPage = 1;
    this.getallState()
  }

  getallState() {
    this.api.getStates().subscribe((response: any) => {
     
      this.stateList = response.data;
      this.totalItems = response.count;
      this.loading = false;
    })
  }

  

  pageChange(pages) {
    this.currentPage = pages.page;
    this.serialNumber = 10 * this.currentPage - 10;
    // this.getallVehicleType();
  }


  deleteState(id){ 
  Swal.fire({
   title: 'Are you sure?',
   text: 'Once deleted, you will not be able to recover this State!',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085D6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes',
   allowOutsideClick: false,
 }).then((result) => {
   if (result.value) {
     const data={
        isDeleted:true,
        _id:id
     }
     this.api.deleteState(data).subscribe((res: any) => {
       if (!res.success) return;
       Swal.fire({
         title: 'Deleted!',
         text: 'Poof! Your State has been deleted!',
         icon: 'success'
       })
       this.getallState();
     })
   }
   
 })
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


