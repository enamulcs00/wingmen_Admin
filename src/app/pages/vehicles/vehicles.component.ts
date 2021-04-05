import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { ThemePalette } from '@angular/material/core';
import { FilterBody } from 'src/app/requests/filter-body';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  imageUrl=base;
  vehicleList:any;
  totalItems:any;
  defaultImage = "assets/img/defaultvehicle.jpg";
  insurance:any;
  ownerDetail:any;
  docs:any;
   loading: boolean = true;
  color: ThemePalette = 'primary';
  vehicleType:any='';
  selectVehicle:any;
  serialNumber:any=0;
  images:any={
    carBackImage:'',
    carFrontImage:'',
    carLeftImage:'',
    carRightImage:'',
    userImage:'',
  }
  filterBody={
    limit:10,
    skip: 0,
    _id:undefined,
    search:undefined,
    isDriverVehicle:undefined
  }
  // filterBody=new FilterBody();

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.filterBody.skip=0;
    this.getallVehicle()
  }

  getallVehicle(){
    this.api.getallVehicle(this.filterBody).subscribe((response:any)=>{
      this.vehicleList=response.data;
      this.loading=false;
      this.totalItems=response.count;
    })
  }

  pushImage(item){  
    this.images.carBackImage=item.carBackImage;
    this.images.carFrontImage=item.carFrontImage;
    this.images.carLeftImage=item.carLeftImage;
    this.images.carRightImage=item.carRightImage;
    if(item.userId){
     this.images.userImage=item.vehicleImage;
    }
    else this.images.userImage=''
  }

  searchVehicle(){
    this.filterBody.search=this.selectVehicle.trim();
    this.filterBody.skip=0;
    this.getallVehicle();
  }

  reset(){
    this.selectVehicle='';
    this.filterBody.search=undefined;
    this.filterBody.skip=0;
    this.getallVehicle();
  }

  getOwnerDetail(data){
    this.filterBody.skip=0;
    if(data.isDriverVehicle){
        this.filterBody._id=data.driverId;
      this.api.getAllDrivers(this.filterBody).subscribe((response:any)=>{
        if(!response.success) return;
       this.ownerDetail=response.data[0];
      })
    }
      if(!data.isDriverVehicle){
        this.filterBody._id=data.userId;
        this.api.getAllUsers(this.filterBody).subscribe((response:any)=>{
          if(!response.success) return;
         this.ownerDetail=response.data[0];
        })
      }
    
  }

  

  getDocs(item){
    this.docs={
      vehicleRegistration:item.vehicalRegistration,
      insurance:item.insuranceDocuments,
      dl:item.drivingCertificate,
      license:item.license,
      taxiPermit:item.taxiPermit
    }
  }

  pageChange(pages){
    // this.currentPage=pages.page;
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getallVehicle();
    this.serialNumber=currentPage*10-10;
  }

  getVehicleType(){
    this.filterBody.skip=0;
    if(this.vehicleType=='driver'){
      this.filterBody.isDriverVehicle=true;
      this.loading=true;
      this.getallVehicle();
    }
    else if(this.vehicleType=='user'){
      this.filterBody.isDriverVehicle=false;
      this.loading=true;
      this.getallVehicle();
    }
    else{
      this.filterBody.isDriverVehicle=undefined;
      this.loading=true;
      this.getallVehicle();
    }
  }

   
  deleteVehicle(id){ 
    Swal.fire({
   title: 'Are you sure?',
   text: 'Once deleted, you will not be able to recover this Vehicle!',
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
     this.api.blockUnblockDeleteVehicleType(data).subscribe((res: any) => {
       if (!res.success) return;
       Swal.fire({
         title: 'Deleted!',
         text: 'Poof! Your Vehicle has been deleted!',
         icon: 'success'
       })
       this.getallVehicle();  
     })
   }
 
 })
}

}
