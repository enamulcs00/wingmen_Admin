import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { ThemePalette } from '@angular/material/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BookingBody } from 'src/app/requests/booking-body';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-roles-listing',
  templateUrl: './roles-listing.component.html',
  styleUrls: ['./roles-listing.component.scss']
})
export class RolesListingComponent implements OnInit {
  imageUrl=base;
  roles:any = [];
  totalItems:any;
  availableDriver:any;
  bookingId:any;
  loading: boolean = true;
  userDetail:any;
  driverDetail:any;
  defaultImage = "assets/img/defaultuser.jpg";
  color: ThemePalette = 'primary';
  vehicleDetail:any;
  serialNumber:any=0;
  filterBody=new BookingBody();
  selectBooking:any;
  bookingType='';
  stops=[];
  driverReview:any;

  constructor(private api:ApiService,private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip=0;
    this.getAllRoles()
  }

  getAllRoles(){
    this.api.getRoles(this.filterBody).subscribe((response:any)=>{
      this.roles = response.data;
      this.loading = false;
      this.totalItems = response.count;
    })
  }

  searchBooking(){
    this.filterBody.search = this.selectBooking.trim();
    this.filterBody.skip = 0;
    this.loading = true
    this.getAllRoles();
  }



  reset(){
    this.selectBooking='';
    this.filterBody.search=undefined;
    this.filterBody.skip=0;
    this.loading = true
    this.getAllRoles();
  }

  pageChange(pages){
    // this.currentPage=pages.page;
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.loading = true
    this.getAllRoles();
    this.serialNumber=currentPage*10-10;
  }

  acceptBooking(item){
    if(!item.driverId) return this.errorToast('Please first assign driver');
  }


  successToast(message) {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }

  delete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this sub-admin',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      // if (result.value) {
      //   const data = {
      //     isDeleted: true,
      //     _id: id
      //   }
      //   this.api.verifyBlockUnBlockDeltedUser(data).subscribe((res: any) => {
      //     if (!res.success) return;
      //     Swal.fire({
      //       title: 'Deleted!',
      //       text: 'Poof! Your Vehicle Type has been deleted!',
      //       icon: 'success'
      //     })
      //     this.getallUser();
      //   })
      // }

    })
  }

  errorToast(message) {
    this.toaster.errorToastr(message);
  }

}
