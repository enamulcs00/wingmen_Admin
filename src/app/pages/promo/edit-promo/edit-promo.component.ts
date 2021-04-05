import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CouponBody } from 'src/app/requests/coupon-body';
import * as moment from 'moment'

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.scss']
})
export class EditPromoComponent implements OnInit {

  couponId: any;
  history = window.history;
  body = new CouponBody();
  type:any;
  flags = {
    isUpdate: false,
    isImgUpload: false,
    isCombo: false,
    isAdded:false
  };

  min:any;
  bsConfig = Object.assign({ isAnimated: true, showWeekNumbers: false, dateInputFormat: 'YYYY-MM-DD' }, { containerClass: 'theme-dark-blue' });

  constructor(private api: ApiService, private router: Router, private toaster: ToastrManager, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.couponId = params.id;
      var d = new Date()
      // d.setDate(d.getDate() + 1)
      this.min=d;
      this.getParticularPromo();
    });
  }

  
  getParticularPromo(){
    this.api.getallPromoCode(this.couponId).subscribe((response:any)=>{
      for(var key in response.data[0]){
        this.body[key]=response.data[0][key]
      }
      if(this.body.isCash==true) this.type='Flat';
      if(this.body.isCash==false) this.type='Percentage';
    })
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
  
  updateCoupon() {
    
    this.flags.isUpdate = true;
    this.body.id = this.couponId;
   
    this.body.expireDate = moment(this.body.expireDate).endOf('day').toISOString();
    this.api.editPromo(this.body).subscribe((response: any) => {
      this.flags.isUpdate=false;
      if(!response.success) return this.errorToast(response.message)
      this.successToast('Coupon updated successfully!');
     }, error => {
        this.flags.isUpdate = false;
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
