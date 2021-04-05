import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  promoList: any;
  serialNumber=0;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  totalItems:any;

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getPromoCode();
  }

  getPromoCode(){
    this.api.getallPromoCode("").subscribe((response:any)=>{
    this.loading=false;
    this.promoList=response.data;
    this.totalItems=response.data;
    
    })
  }

  pageChange(pages){
    // const currentPage=pages.page
    // this.filterBody.skip=currentPage*10-10;
    // this.filterBody.limit=10;
    // this.getallDriver();
    // this.serialNumber=currentPage*10-10;
  }

  deletePromo(id){ 
  Swal.fire({
   title: 'Are you sure?',
   text: 'Once deleted, you will not be able to recover this Coupon!',
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085D6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes',
   allowOutsideClick: false,
 }).then((result) => {
   if (result.value) {
     const data={
        isDeleted:true,
        _id:id
     } 
     this.api.deletePromoCode(data).subscribe((res: any) => {
       if (!res.success) return;
       Swal.fire({
         title: 'Deleted!',
         text: 'Poof! Your Coupon has been deleted!',
         icon: 'success'
       })
       this.getPromoCode();
     })
   }
   
 })
}


}
