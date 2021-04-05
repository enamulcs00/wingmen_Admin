import { Component, OnInit, ViewChild } from '@angular/core';
 import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import { ThemePalette } from '@angular/material/core';
 import { DeleteBody } from 'src/app/requests/delete-body';
import { FilterBody } from 'src/app/requests/filter-body';
import { EventtypeModalComponent } from './eventtype-modal/eventtype-modal.component';

@Component({
  selector: 'app-eventtype',
  templateUrl: './eventtype.component.html',
  styleUrls: ['./eventtype.component.scss']
})
export class EventtypeComponent implements OnInit {

  deleteBody=new DeleteBody();
  filterBody=new FilterBody();
  serialNumber = 0;
  totalItems: number;
  currentPage: number;
  eventTypeList;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  flags = {
    isEdit: false
  };

  @ViewChild(EventtypeModalComponent, { static: false }) public modalComponent: EventtypeModalComponent;
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip=0;
    this.getEventType()
  }

  getEventType() {
    this.api.getEventType().subscribe((response: any) => {
      this.eventTypeList = response.data;
      this.totalItems = response.count;
      this.loading = false;
    })
  }

  

  pageChange(pages){
    // this.currentPage=pages.page;
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getEventType();
    this.serialNumber=currentPage*10-10;
  }


  //block Delete TransmissionType
    
   deleteEventType(id){ 
       Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Event Type!',
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
        this.api.blockDeleteEventType(data).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Event Type has been deleted!',
            icon: 'success'
          })
          this.getEventType();  
        })
      }
    
    })
  }
  
  changeblockStatus(item){
        const data={
          isBlocked:item.isBlocked,
          _id:item._id
        }
        this.api.blockDeleteEventType(data).subscribe((res: any) => {
          if (!res.success) return ;
          this.successToast('Status changed successfully')   
        
      // this.getEventType();
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


