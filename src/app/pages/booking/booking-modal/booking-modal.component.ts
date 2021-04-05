import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number = 37.09024;
  longitude: number = -95.712891;
  zoom: number = 8;
  @Input() driverList: any;
  @Input() driver: any;
  @Input() requestId: string;
  @Input() user: any;
  @Input() vehicle: any;
  @Input() stop: any;
  @Input() DriverReview:any;
  @Output() onDriverAssign = new EventEmitter();

  imageUrl: string;
  body = { bookingId: '', driverId: '' };
  flags = {
    isAssigned: false
  };
  driverId: any = 0;
  geoCoder: any;
  address: any;
  icon: { url: string; scaledSize: { width: number; height: number; }; };

  constructor(private api: ApiService, private toaster: ToastrManager , private mapsAPILoader: MapsAPILoader) { 
    this.icon = {
      url: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/car-512.png',
      scaledSize: {
        width: 20,
        height: 20
      }
    }
  }

  ngOnInit() {
    // this.imageUrl = this.url.imageUrl;
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
    }); 
    this.checklive()
  }

   checklive()
   {
    this.api.checkliveloca('id').subscribe((res:any)=>
    {
      console.log(res);
    })
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

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
