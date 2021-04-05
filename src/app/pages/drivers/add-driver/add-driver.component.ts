import { Component, OnInit } from '@angular/core';
import { DriverBody } from 'src/app/requests/driver-body';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/services/api.service';
import countryCode from 'src/app/requests/countrycode';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  history = window.history;
  body = new DriverBody();
  countryCode: any;
  codes = [];
  src1: any;
  src2: any;
  file1: File;
  DL: any;
  lat: any;
  long: any;
  flags = {
    isAdded: false
  };

  formData = new FormData();

  constructor(
    private api: ApiService,
    private router: Router,
    private toaster: ToastrManager
  ) { }

  ngOnInit() {
    this.codes = countryCode;
  }

  addDriver() {
    if (!this.file1) return this.errorToast('Please select image.');
    if (!this.DL) return this.errorToast('Please select Driver Lisence.');

    this.flags.isAdded = true

    for (var key in this.body) {
      this.formData.append(key, this.body[key]);
    }
    this.formData.append('image', this.file1);
    this.formData.append('driverLisence', this.DL);
    this.formData.append('latitude', this.lat);
    this.formData.append("lattitude", this.lat)
    this.formData.append("longitude", this.long)
    this.formData.append('genderType', this.body.gender);

    this.api.addDriver(this.formData).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.formData = new FormData();
        return this.errorToast(response.message);
      } else {
        this.successToast('Driver added successfully!');
        this.router.navigateByUrl('/drivers');
      }
    }, error => {
      this.formData = new FormData();
      this.flags.isAdded = false;
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
      // this.formData.append('image', this.file1);
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
    })
  }

  // onImageSelect2(e) {
  //   const file = e.target.files[0];
  //   this.formData.delete('image');
  //   if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.src2 = event.target.result;
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //     this.file2 = file;
  //     this.formData.append('documentTwo', this.file2);
  //   } else {
  //     this.errorToast('Selected file is not image.');
  //   }
  // }




  //get place 
  handleAddressChange(event) {
    this.lat = event.geometry.location.lat();
    this.long = event.geometry.location.lng();
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