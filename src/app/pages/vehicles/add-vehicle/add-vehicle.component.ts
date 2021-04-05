import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  url=base;
  // imageUrl=this.url;
  history=window.history;
  defaultImage='assets/img/defaultvehicle'
  src:any;
  body:any;
  leftImage:any;
  rightImage:any;
  frontImage:any;
  backImage:any;
  vehicleId:any;
  flags={
    isAdded:false  
  }
  constructor(private api: ApiService, private router: Router, private toaster: ToastrManager, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  getInsuance(event){
    const file=event.target.files[0];
    const formData=new FormData();
     formData.append('image',file)
    this.api.uploadFile(formData).subscribe((response:any)=>{
      this.body.vehicleInsurance=response.data.orignal  
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
    this.body.vehicleRegistration=response.data.orignal  
  })
}

getCertificate(event){
  const file=event.target.files[0];
  const formData=new FormData();
   formData.append('image',file)
  this.api.uploadFile(formData).subscribe((response:any)=>{
    this.body.driverCertificate=response.data.orignal  
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
   this.api.updateVehicle(this.body).subscribe((response:any)=>{
    if(!response.success) return this.errorToast(response.message)
    this.successToast(response.message);   
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



