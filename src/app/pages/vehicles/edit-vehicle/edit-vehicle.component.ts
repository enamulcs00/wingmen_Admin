import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FilterBody } from 'src/app/requests/filter-body';
import base from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {
  filterBody=new FilterBody();
  url=base;
  imageUrl=this.url;
  history=window.history;
  defaultImage='assets/img/defaultvehicle.jpg';
  src:any;
  body:any;
  leftImage:any;
  rightImage:any;
  frontImage:any;
  backImage:any;
  vehicleId:any;
  flags={
    isUpdate:false  
  }

  constructor(private api: ApiService, private router: Router, private toaster: ToastrManager, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params)=>{
       this.vehicleId=params.id;
       this.filterBody._id=this.vehicleId
       this.getParticularVehicle();
    })
  }

  getParticularVehicle(){
    this.api.getallVehicle(this.filterBody).subscribe((response:any)=>{
      this.body=response.data[0];
      this.src=this.imageUrl + this.body.vehicleImage;
      this.leftImage=this.imageUrl + this.body.carLeftImage;
      this.rightImage=this.imageUrl + this.body.carRightImage;
      this.frontImage=this.imageUrl + this.body.carFrontImage;
      this.backImage=this.imageUrl + this.body.carBackImage;
      console.log("particular ve",response)
    });
  }

  getInsuance(event){
    const file=event.target.files[0];
    const formData=new FormData();
     formData.append('image',file)
    this.api.uploadFile(formData).subscribe((response:any)=>{
      this.body.insuranceDocuments=response.data.orignal  
    })
 }

 getPermit(event){
  const file=event.target.files[0];
  const formData=new FormData();
   formData.append('image',file)
  this.api.uploadFile(formData).subscribe((response:any)=>{
    this.body.taxiPermit=response.data.orignal  
  })
}

 getlicense(event){
  const file=event.target.files[0];
  const formData=new FormData();
   formData.append('image',file)
  this.api.uploadFile(formData).subscribe((response:any)=>{
    this.body.license=response.data.orignal  
  })
}

getReg(event){
  const file=event.target.files[0];
  const formData=new FormData();
   formData.append('image',file)
  this.api.uploadFile(formData).subscribe((response:any)=>{
    this.body.vehicalRegistration=response.data.orignal  
  })
}

getCertificate(event){
  const file=event.target.files[0];
  const formData=new FormData();
   formData.append('image',file)
  this.api.uploadFile(formData).subscribe((response:any)=>{
    this.body.drivingCertificate=response.data.orignal;
    
  })
}

  onImageSelect(e) {
    const file = e.target.files[0];
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
         
      };
      reader.readAsDataURL(e.target.files[0]);
      const formData=new FormData();
      formData.append('image',file);
      this.api.uploadFile(formData).subscribe((response:any)=>{
        this.body.vehicleImage=response.data.orignal 
      })

    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  leftImageSelect(e) {
    const file = e.target.files[0];
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.leftImage = event.target.result;       
      };
      reader.readAsDataURL(e.target.files[0]);
      const formData=new FormData();
      formData.append('image',file);
      this.api.uploadFile(formData).subscribe((response:any)=>{
        this.body.carLeftImage=response.data.orignal 
      })

    } else {
      this.errorToast('Selected file is not image.');
    }
  }


  rightImageSelect(e) {
    const file = e.target.files[0];
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.rightImage = event.target.result;
        
      };
      reader.readAsDataURL(e.target.files[0]);
      const formData=new FormData();
      formData.append('image',file);
      this.api.uploadFile(formData).subscribe((response:any)=>{
        this.body.carRightImage=response.data.orignal 
      })

    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  frontImageSelect(e) {
    const file = e.target.files[0];
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.frontImage = event.target.result;
        
      };
      reader.readAsDataURL(e.target.files[0]);
      const formData=new FormData();
      formData.append('image',file);
      this.api.uploadFile(formData).subscribe((response:any)=>{
        this.body.carFrontImage=response.data.orignal 
      })

    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  backImageSelect(e) {
    const file = e.target.files[0];
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.backImage = event.target.result;
        
      };
      reader.readAsDataURL(e.target.files[0]);
      const formData=new FormData();
      formData.append('image',file);
      this.api.uploadFile(formData).subscribe((response:any)=>{
        this.body.carBackImage=response.data.orignal 
      })

    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  updateVehicle(){
    this.body.vehicleId=this.vehicleId;
   this.api.updateVehicle(this.body).subscribe((response:any)=>{
    if(!response.success) return this.errorToast(response.message)
    this.successToast(response.message);
    this.getParticularVehicle();
    this.router.navigate(['wingmen/vehicles'])
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
