import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { ThemePalette } from '@angular/material/core';
import { FilterBody } from 'src/app/requests/driver-body';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  imageUrl=base;
  driverList:any;
  totalItems:any;
  loading: boolean = true;
  selectDriver:any;
  defaultImage = "assets/img/defaultuser.jpg";
  color: ThemePalette = 'primary';
  serialNumber:any=0;
  driverType:any='';
  filterBody=new FilterBody();

  constructor(private api:ApiService,private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip=0;
    this.getallDriver()
  }

  getallDriver(){
    this.api.getAllDrivers(this.filterBody).subscribe((response:any)=>{
      this.driverList=response.data;
      this.loading=false;
      this.totalItems=response.count;
    })
  }

  pageChange(pages){
    // this.currentPage=pages.page;
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getallDriver();
    this.serialNumber=currentPage*10-10;
  }

  approveDriver(item){
    const data={
    _id:item._id,
    isApproved:true
    }
    this.api.verifyBlockUnBlockDeltedDriver(data).subscribe((response:any)=>{
      if(!response.success) this.errorToast(response.message)
      this.successToast('Account has been approved')
      this.getallDriver();
    })
  }

  changeStatus(item){
    const data={
      _id:item._id,
      activeStatus:item.activeStatus
      }
      this.api.verifyBlockUnBlockDeltedDriver(data).subscribe((response:any)=>{
        if(!response.success) this.errorToast(response.message)
        this.successToast(response.message)
        this.getallDriver();
      })
  }

  searchDriver(){
    this.filterBody.search=this.selectDriver.trim();
    this.filterBody.skip=0;
    this.getallDriver();
  }

  reset(){
    this.selectDriver='';
    this.filterBody.search=undefined;
    this.filterBody.skip=0;
    this.getallDriver();
  }

  exportCsv() {
    window.open(`${this.api.baseUrl}/api/v1/admin/exportDriverCsv`)
  }

  getDriverType(){
    this.filterBody=new FilterBody();
   if(this.driverType=='Pilot') this.filterBody.isPilot=true;
   if(this.driverType=='Copilot') this.filterBody.isCopilot=true;
   this.loading=true;
   this.getallDriver();
  }

  blockDriver(item){
    const data={
      _id:item._id,
      isBlocked:item.isBlocked
      }
      this.api.verifyBlockUnBlockDeltedDriver(data).subscribe((response:any)=>{
        if(!response.success) this.errorToast(response.message)
        this.successToast('Status changed successfully')
        // this.getallDriver();
      })
  }

  
  deleteDriver(id){ 
    Swal.fire({
   title: 'Are you sure?',
   text: 'Once deleted, you will not be able to recover this Driver!',
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
     this.api.verifyBlockUnBlockDeltedDriver(data).subscribe((res: any) => {
       if (!res.success) return;
       Swal.fire({
         title: 'Deleted!',
         text: 'Poof! Your Driver has been deleted!',
         icon: 'success'
       })
       this.getallDriver();
     })
   }
   
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