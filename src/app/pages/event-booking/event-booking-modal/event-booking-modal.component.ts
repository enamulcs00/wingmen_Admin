import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-event-booking-modal',
  templateUrl: './event-booking-modal.component.html',
  styleUrls: ['./event-booking-modal.component.scss']
})
export class EventBookingModalComponent implements OnInit {

  @Input() driverList: any;
  @Input() driverDetail: any;
  @Input() requestId: string;
  @Input() user: any;
  @Output() onDriverAssign = new EventEmitter();

  imageUrl: string;
  body = { bookingId: '', driverId: '' };
  flags = {
    isAssigned: false
  };
  driverId: any = 0;

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    // this.imageUrl = this.url.imageUrl;
       
  }

   

  assignDriver() {
    this.flags.isAssigned = true;
    
    this.body.bookingId = this.requestId;
    
    this.api.bookingStatus(this.body).subscribe((response: any) => {
      this.flags.isAssigned = false;
      if (!response.success) return;
      this.successToast('Booking has been accepted');
      this.body = { bookingId: '', driverId: '' };
      this.onDriverAssign.emit();
      document.getElementById('closeDriverAssignModal').click();
    }, error => {
      this.flags.isAssigned = false;
    });
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
