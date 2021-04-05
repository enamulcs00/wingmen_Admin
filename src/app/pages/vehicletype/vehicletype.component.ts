import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicletypeModalComponent } from './vehicletype-modal/vehicletype-modal.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import { DeleteBody } from 'src/app/requests/delete-body';
import { ThemePalette } from '@angular/material/core';
import { FilterBody } from 'src/app/requests/filter-body';

@Component({
  selector: 'app-vehicletype',
  templateUrl: './vehicletype.component.html',
  styleUrls: ['./vehicletype.component.scss']
})
export class VehicletypeComponent implements OnInit {

  deleteBody=new DeleteBody();
  filterBody=new FilterBody();
  serialNumber = 0;
  totalItems: number;
  currentPage: number;
  vehicleTypeList;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  flags = {
    isEdit: false
  };

  @ViewChild(VehicletypeModalComponent, { static: false }) public modalComponent: VehicletypeModalComponent;
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.currentPage = 1;
    this.getallVehicleType()
  }

  getallVehicleType() {
    this.api.getallVehicleType().subscribe((response: any) => {
      this.vehicleTypeList = response.data;
      this.totalItems = response.count;
      this.loading = false;
    }),error=>{
      this.loading=false;
      this.errorToast(error);
    }
  }

  

  pageChange(pages){
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getallVehicleType();
    this.serialNumber=currentPage*10-10;
  }


  deleteVehicleType(id){ 
  Swal.fire({
   title: 'Are you sure?',
   text: 'Once deleted, you will not be able to recover this Vehicle Type!',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085D6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes',
   allowOutsideClick: false,
 }).then((result) => {
   if (result.value) {
     this.deleteBody.isDeleted=true;
     this.deleteBody._id=id;
     this.api.deleteVehicleType(this.deleteBody).subscribe((res: any) => {
       if (!res.success) return;
       Swal.fire({
         title: 'Deleted!',
         text: 'Poof! Your Vehicle Type has been deleted!',
         icon: 'success'
       })
       this.getallVehicleType();
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

