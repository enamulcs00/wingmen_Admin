 import { ServicetypeModalComponent } from './servicetype-modal/servicetype-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
 import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import { ThemePalette } from '@angular/material/core';
import { FilterBody } from 'src/app/requests/filter-body';

@Component({
  selector: 'app-servicetype',
  templateUrl: './servicetype.component.html',
  styleUrls: ['./servicetype.component.scss']
})
export class ServicetypeComponent implements OnInit {
  filterBody=new FilterBody()
  imageurl=base;
  serialNumber = 0;
  totalItems: number;
  serviceTypeList;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  flags = {
    isEdit: false
  };

  @ViewChild(ServicetypeModalComponent, { static: false }) public modalComponent: ServicetypeModalComponent;
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip=0;
    this.getServiceType()
  }

  getServiceType() {
    this.api.getallServiceType().subscribe((response: any) => {
      this.serviceTypeList = response.data;
      this.totalItems = response.count;
      this.loading = false;
    })
  }

  

  pageChange(pages){
    // this.currentPage=pages.page;
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getServiceType();
    this.serialNumber=currentPage*10-10;
  }


  deleteServiceType(id){ 
    Swal.fire({
   title: 'Are you sure?',
   text: 'Once deleted, you will not be able to recover this Service Type!',
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
     this.api.deleteServiceType(data).subscribe((res: any) => {
       if (!res.success) return;
       Swal.fire({
         title: 'Deleted!',
         text: 'Poof! Your Service Type has been deleted!',
         icon: 'success'
       })
       this.getServiceType();
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

