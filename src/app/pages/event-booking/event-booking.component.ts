import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { ThemePalette } from '@angular/material/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { BookingBody } from 'src/app/requests/booking-body';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.scss']
})
export class EventBookingComponent implements OnInit {

  imageUrl = base;
  bookingList: any;
  totalItems: any;
  availableDriver: any;
  bookingId: any;
  loading: boolean = true;
  selectEventBooking: any;
  userDetail: any;
  defaultImage = "assets/img/defaultuser.jpg";
  color: ThemePalette = 'primary';
  bookingType = '';
  serialNumber: any = 0;
  filterBody = new BookingBody();

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip = 0;
    this.getallBooking()
  }

  getallBooking() {
    this.filterBody.isEventBooking = true;
    this.api.getAllBooking(this.filterBody).subscribe((response: any) => {
      this.bookingList = response.data;
      this.loading = false;
      this.totalItems = response.count;
    })
  }

  getDriver(data) {
    this.api.getAllAvailableDriver({ bookingId: data._id }).subscribe((response: any) => {
      this.availableDriver = response.data;
      this.bookingId = data._id;
    })
  }

  getBookingType() {
    if (this.bookingType == 'past') {
      this.filterBody.isPastbookings = true;
      this.filterBody.isUpcommingbookings = false;
    }
    else if (this.bookingType == 'upcoming') {
      this.filterBody.isUpcommingbookings = true;
      this.filterBody.isPastbookings = false;
    }
    else {
      this.filterBody.isPastbookings = false;
      this.filterBody.isUpcommingbookings = false;
    }
    this.filterBody.skip = 0;
    this.loading = true;
    this.getallBooking();
  }

  searchBooking() {
    this.filterBody.search = this.selectEventBooking.trim();
    this.filterBody.skip = 0;
    this.getallBooking();
  }

  reset() {
    this.selectEventBooking = '';
    this.filterBody.search = undefined;
    this.filterBody.skip = 0;
    this.getallBooking();
  }

  processBooking(id, status) {
    let body = {
      bookingId: id,
      bookingStatus: status
    }
    this.api.eventBookingStatus(body).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message);
      this.successToast(response.message);
      this.getallBooking();
    })
  }

  pageChange(pages) {
    const currentPage = pages.page
    this.filterBody.skip = currentPage * 10 - 10;
    this.filterBody.limit = 10;
    this.getallBooking();
    this.serialNumber = currentPage * 10 - 10;
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