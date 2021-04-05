 import { Component, OnInit, ViewChild } from '@angular/core';
 import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import { ThemePalette } from '@angular/material/core';
import { TransmissiontypeModalComponent } from './transmissiontype-modal/transmissiontype-modal.component';
import { DeleteBody } from 'src/app/requests/delete-body';
import { FilterBody } from 'src/app/requests/filter-body';

@Component({
  selector: 'app-transmissiontype',
  templateUrl: './transmissiontype.component.html',
  styleUrls: ['./transmissiontype.component.scss']
})
export class TransmissiontypeComponent implements OnInit {
  deleteBody=new DeleteBody();
  filterBody=new FilterBody();
  serialNumber = 0;
  totalItems: number;
  currentPage: number;
  transmissionTypeList;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  flags = {
    isEdit: false
  };

  @ViewChild(TransmissiontypeModalComponent, { static: false }) public modalComponent: TransmissiontypeModalComponent;
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip=0;
    this.getTransmissionType()
  }

  getTransmissionType() {
    this.api.getTransmissionType().subscribe((response: any) => {
      this.transmissionTypeList = response.data;
      this.totalItems = response.count;
      this.loading = false;
    })
  }

  

  pageChange(pages){
    // this.currentPage=pages.page;
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getTransmissionType();
    this.serialNumber=currentPage*10-10;
  }


  //block Delete TransmissionType
    
   deleteTransmissionType(item){ 
       Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Transmission Type!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.deleteBody.isDeleted=true;
        this.deleteBody._id=item._id;
        this.api.blockDeleteTransmissionType(this.deleteBody).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Transmission Type has been deleted!',
            icon: 'success'
          })
          this.getTransmissionType();
        })
      }
      
    })
  }
  
  changeblockStatus(item){
    this.deleteBody._id=item._id;
    this.deleteBody.isBlocked=item.isBlocked;
        this.api.blockDeleteTransmissionType(this.deleteBody).subscribe((res: any) => {
          if (!res.success) return ;
         this.successToast('Status changed successfully')
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


