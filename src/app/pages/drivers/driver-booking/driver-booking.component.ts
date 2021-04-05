import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BookingBody } from 'src/app/requests/booking-body';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-driver-booking',
  templateUrl: './driver-booking.component.html',
  styleUrls: ['./driver-booking.component.scss']
})
export class DriverBookingComponent implements OnInit {
  driverId:any;
  bookingList: any;
  serialNumber:any=0;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  history = window.history;
  bookingType:any='';
  filterBody=new BookingBody();
  totalItems:any;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router, private toaster: ToastrManager) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.driverId=params.id;
      this.filterBody.driverId=this.driverId;
    })

    this.getDriverBooking();
  }

  getDriverBooking(){
    this.api.getAllBooking(this.filterBody).subscribe((response:any)=>{
      this.loading=false;
      this.bookingList=response.data;
      this.totalItems=response.count;
    })
  }

  getBookingtype(){
    if(this.bookingType=='') this.filterBody.isEventBooking=false;
    if(this.bookingType=='event') this.filterBody.isEventBooking=true;
    this.getDriverBooking();
  }

  pageChange(pages){
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getDriverBooking();
    this.serialNumber=currentPage*10-10;
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
