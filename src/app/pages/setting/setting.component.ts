import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SettingBody } from 'src/app/requests/setting-body';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  body = new SettingBody();
  flags = {
    isUpdate: false
  }

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.getProfile();
  }

  setCodriverShare(val) {
    this.body.coDriverSharePercentage = (!isNaN(val) && (val > 0)  && (val < 100)) ? 100 - val : 0
  }

  getProfile() {
    this.api.getAdminProfile({}).subscribe((response: any) => {
      this.body = response.data
    })
  }

  updateAdminProfile() {
    if((this.body.driverSharePercentage > 100) || (this.body.driverSharePercentage < 0)) return this.errorToast('Driver percentage should be between 0-100')
    if (this.body.latitude == null) return this.errorToast('Please select valid address')
    this.api.updateAdminProfile(this.body).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message)
      this.successToast('Setting updated successfully');
      this.getProfile();
    })
  }

  handleAddressChange(event) {
    this.body.address = event.formatted_address;
    this.body.latitude = event.geometry.location.lat();
    this.body.longitude = event.geometry.location.lng();
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
