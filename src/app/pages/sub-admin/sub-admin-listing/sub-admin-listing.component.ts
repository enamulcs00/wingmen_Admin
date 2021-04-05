import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { ThemePalette } from '@angular/material/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BookingBody } from 'src/app/requests/booking-body';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sub-admin-listing',
  templateUrl: './sub-admin-listing.component.html',
  styleUrls: ['./sub-admin-listing.component.scss']
})

export class SubAdminListingComponent implements OnInit {
  imageUrl=base;
  subadmins:any = [];
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
    this.getAllSubadmins()
  }

  getAllSubadmins(){
    this.api.getSubadmins(this.filterBody).subscribe((response:any)=>{
      this.subadmins = response.data;
      this.loading = false;
      this.totalItems = response.count;
    })
  }

  searchBooking(){
    this.filterBody.search = this.selectBooking.trim();
    this.filterBody.skip = 0;
    this.loading = true
    this.getAllSubadmins();
  }

  convertToMiles(kms) {
    return Math.round((kms/1609)*100) / 100
  }

  exportCsv() {
    window.open(`${this.api.baseUrl}/api/v1/admin/exportBookingCsv`)
  }

  initiateRefund(id) {
    this.loading = true
    let obj = {
      paymentStatus: 'REFUND'
    }
    this.api.initiateRefund(id, obj).subscribe(response => {
      this.loading = false
      this.getAllSubadmins()
    })
  }

  reset(){
    this.selectBooking='';
    this.filterBody.search=undefined;
    this.filterBody.skip=0;
    this.loading = true
    this.getAllSubadmins();
  }


  getDriver(data){
    this.api.getAllAvailableDriver({bookingId:data._id}).subscribe((response:any)=>{
      this.availableDriver=response.data;
      this.bookingId=data._id;
    })
  }

  getStops(item){
  this.stops=[];
   if(item.dropUpAddressFirst) this.stops.push(item.dropUpAddressFirst);
   if(item.dropUpAddressSecond)  this.stops.push(item.dropUpAddressSecond);
   if(item.dropUpAddressThird)  this.stops.push(item.dropUpAddressThird);
   if(item.dropUpAddressFour)  this.stops.push(item.dropUpAddressFour);
  }

  processOrder(item){
    const data={
      bookingId:item._id,
      driverId:item.driverId
    }
    this.api.bookingStatus(data).subscribe((response:any)=>{
    })
  }

  getBookingType(){
    if(this.bookingType=='past'){
      this.filterBody.isPastbookings=true;
      this.filterBody.isUpcommingbookings=false;
    }
    else if(this.bookingType=='upcoming'){
      this.filterBody.isUpcommingbookings=true;
      this.filterBody.isPastbookings=false;
    }
    else{
      this.filterBody.isPastbookings=false;
      this.filterBody.isUpcommingbookings=false;
    }
    this.filterBody.skip=0;
    this.loading=true;
    this.getAllSubadmins();
  }

  pageChange(pages){
    // this.currentPage=pages.page;
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.loading = true
    this.getAllSubadmins();
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
