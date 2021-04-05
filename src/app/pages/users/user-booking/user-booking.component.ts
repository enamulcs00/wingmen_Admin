import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BookingBody } from 'src/app/requests/booking-body';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
})
export class UserBookingComponent implements OnInit {
  userId:any;
  history=window.history;
  serialNumber:any=0
  bookingList: any;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  totalItems:any;
  bookingType:any=''
  filterBody=new BookingBody();

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router, private toaster: ToastrManager) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.userId=params.id;
      this.filterBody.userId=this.userId;
    })
    
    this.getUserBooking();
  }

  getUserBooking(){
    this.api.getAllBooking(this.filterBody).subscribe((response:any)=>{
      this.loading=false;
      this.bookingList=response.data;
      this.totalItems=response.count;
    })
  }

  getBookingtype(){
    if(this.bookingType=='') this.filterBody.isEventBooking=false;
    if(this.bookingType=='event') this.filterBody.isEventBooking=true;
    this.getUserBooking();
  }



  pageChange(pages){
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getUserBooking();
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
