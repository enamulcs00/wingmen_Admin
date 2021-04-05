import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-appversion',
  templateUrl: './appversion.component.html',
  styleUrls: ['./appversion.component.scss']
})
export class AppversionComponent implements OnInit {
  // latestIOSVersion:any;
  // latestAndroidVersion:any;
  // criticalAndroidVersion:any
  // criticalIOSVersion:any;
  // latestWebID:any
  // criticalWebID:any
  // updateMessageAtPopup:any
  // updateTitleAtPopup:any;
  versionData:any;
  flags={
    isUpdate:false
  }

  constructor(private api:ApiService,private toaster:ToastrManager) { }

  ngOnInit() {
    this.getAppversions();
  }

  getAppversions(){
    this.api.getAppVersion().subscribe((response:any)=>{
      this.versionData=response.data;
    })
  }

  setAppVersion(value){
    this.api.setAppVersion(this.versionData).subscribe((response:any)=>{
      if(!response.success) return this.errorToast(response.message)
       this.successToast(response.message);
       this.getAppversions();
    })
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
