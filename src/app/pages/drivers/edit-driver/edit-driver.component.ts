import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DriverBody } from 'src/app/requests/driver-body';
import base from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FilterBody } from 'src/app/requests/filter-body';
import countryCode from 'src/app/requests/countrycode';


@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {

  driverId: any;
  body = new DriverBody();
  imageUrl = base;
  history = window.history;
  defaultImage = "assets/img/defaultuser.jpg";
  src1: any;
  src2: any;
  file1: File;
  DL: any;
  filterBody = new FilterBody();
  codes = [];
  lat: any;
  long: any;

  formData = new FormData;
  flags = {
    isUpdate: false,
    isImgUpload: false,
    isCombo: false
  };




  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router, private toaster: ToastrManager) { }

  ngOnInit() {
    this.codes = countryCode;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.driverId = params.id;
      this.filterBody._id = this.driverId
      this.getParticularDriver();
    });
  }

  getParticularDriver() {
    this.api.getAllDrivers(this.filterBody).subscribe((response: any) => {
      const data = response.data[0];
      this.body = data;
      this.body.gender = this.body.gender.toUpperCase();
      let stringValue = data.carStatus.toLowerCase();
      this.body.carStatus = JSON.parse(stringValue);   //returns true
      this.src1 = this.imageUrl + data.image;
      this.src2 = this.imageUrl + data.driverLisence;
      this.driverId = data._id;
      this.lat = data.latitude;
      this.long = data.longitude;
    })
  }

  editDriver() {
    this.flags.isUpdate = true;
    if (this.body.firstName.trim() == "") return this.errorToast('Please enter First Name')
    if (this.body.lastName.trim() == "") return this.errorToast('Please enter Last Name')
    if (!this.body.address) return this.errorToast('Please fill valid address');

    this.formData.append('_id', this.driverId)
    this.formData.append('firstName', this.body.firstName)
    this.formData.append('lastName', this.body.lastName)
    this.formData.append('email', this.body.email)
    this.formData.append('countryCode', this.body.countryCode)
    this.formData.append('phone', this.body.phone)
    this.formData.append('gender', this.body.gender)
    this.formData.append('address', this.body.address)
    this.formData.append('latitude', this.lat)
    this.formData.append('longitude', this.long)
    this.formData.append('genderType', this.body.gender);
    this.formData.append('carStatus', JSON.stringify(this.body.carStatus));
    this.formData.append('isTransmissionType', JSON.stringify(this.body.isTransmissionType))


    this.api.editDriver(this.formData).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        this.formData = new FormData();
        return this.errorToast(response.message);
      } else {
        this.successToast('Driver updated successfully!');
        this.formData = new FormData();
        this.getParticularDriver();
      }
    }, error => {
      this.flags.isUpdate = false;
    });
  }


  onImageSelect1(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src1 = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file1 = file;
      this.formData.append('image', this.file1);
    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  getDL(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.src2 = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    const formData = new FormData();
    formData.append('image', file)
    this.api.uploadFile(formData).subscribe((response: any) => {
      this.DL = response.data.orignal
      this.formData.append('driverLisence', this.DL);
    })
  }

  //get place 
  handleAddressChange(event) {
    this.formData.append("lattitude", event.geometry.location.lat())
    this.formData.append("longitude", event.geometry.location.lng())
    this.body.address = event.formatted_address;
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