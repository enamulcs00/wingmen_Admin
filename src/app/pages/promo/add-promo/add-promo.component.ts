import { Component, OnInit } from '@angular/core';
import {CouponBody} from 'src/app/requests/coupon-body';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment'



@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.scss']
})
export class AddPromoComponent implements OnInit {
  history = window.history;
   body = new CouponBody();
   todayDate:any;
   type:any=""

  min:any;
  bsConfig = Object.assign({ isAnimated: true, showWeekNumbers: false, dateInputFormat: 'YYYY-MM-DD' }, { containerClass: 'theme-dark-blue' });
  flags = {
    isAdded: false
  };
  constructor(
    private api: ApiService, private toaster: ToastrManager,
    private router: Router
  ) { }

  ngOnInit() {
    this.body.isCash=false;
    var d = new Date()
    // d.setDate(d.getDate() + 1)
    this.min=d;
   }

  selectType(){
    if(this.type=='Flat'){
      this.body.isCash=true;
      this.body.percentage=''
    }
    if(this.type=='Percentage'){
      this.body.isCash=false;
      this.body.cashback=''
    } 
  }

  addCoupon(){
    // this.body.expireDate = moment(this.body.expireDate).format('YYYY-MM-DDThh:mm:s');
    this.body.expireDate  = moment(this.body.expireDate).endOf('day').toString();
     
    this.flags.isAdded=true;
    this.api.addPromo(this.body).subscribe((response:any)=>{
      this.flags.isAdded=false;
      if(!response.success) return this.errorToast(response.message);
      this.successToast(response.message);
      this.router.navigateByUrl('/wingmen/coupon');
    }, error => {
      this.flags.isAdded = false;
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