import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  isSubmitted:boolean = false
  body:any;
  vehicleForm:FormGroup
  leftImage:any;
  rightImage:any;
  frontImage:any;
  backImage:any;
  vehicleId:any;
  flags={
    isAdded:false  
  }
  vehicleTypeList: any;
  insurance: any;
  registration: any;
  driving: any;
  constructor(private api: ApiService, private router: Router, private toaster: ToastrManager, private activatedRoute: ActivatedRoute,private fb:FormBuilder) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      "vehicleName":        ['',Validators.required],
      "vehicleMake":        ['',Validators.required],
      "vehicleModel":       ['',Validators.required],
      "vehicleTypeId":      ['',Validators.required],
      "vehicleImage":       ['',Validators.required],
      "insuranceDocuments": ['',Validators.required],
      "transmissionTypeId": ['',Validators.required],
      "vehicalRegistration": ['',Validators.required],
      "drivingCertificate": ['',Validators.required],
      "color":              ['',Validators.required],
      "plateNumber":        ['',Validators.required],
      "state":['',Validators.required],
      isHybrid: [false],
      isElectric: [false],
      carRightImage:[''],
      carFrontImage:[''],
      carBackImage:[''],
      carLeftImage:[''],
    })
    this.getTransmissionType()
    this. getallVehicleType()
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
    this.vehicleForm.controls['vehicleImage'].setValue(file)
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
         
      };
      reader.readAsDataURL(e.target.files[0]);
      // const formData=new FormData();
      // formData.append('image',file);
      // this.api.uploadFile(formData).subscribe((response:any)=>{
      //   this.body.vehicleImage=response.data.orignal 
      // })

    } else {
      this.errorToast('Selected file is not image.');
    }
  }
  onInsuranceSelect(e) {
    const file = e.target.files[0];
    this.vehicleForm.controls['insuranceDocuments'].setValue(file)
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.insurance = event.target.result;
         
      };
      reader.readAsDataURL(e.target.files[0]);
      // const formData=new FormData();
      // formData.append('image',file);
      // this.api.uploadFile(formData).subscribe((response:any)=>{
      //   this.body.vehicleImage=response.data.orignal 
      // })

    } else {
      this.errorToast('Selected file is not image.');
    }
  }
  onRegistrationSelect(e) {
    const file = e.target.files[0];
    this.vehicleForm.controls['vehicalRegistration'].setValue(file)
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.registration = event.target.result;
         
      };
      reader.readAsDataURL(e.target.files[0]);
      // const formData=new FormData();
      // formData.append('vehicalRegistration',file);
      // this.api.uploadFile(formData).subscribe((response:any)=>{
      //   this.body.vehicleImage=response.data.orignal 
      // })

    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  ondrivingLicense(e) {
    const file = e.target.files[0];
    this.vehicleForm.controls['drivingCertificate'].setValue(file)
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.driving = event.target.result;
         
      };
      reader.readAsDataURL(e.target.files[0]);
      // const formData=new FormData();
      // formData.append('vehicalRegistration',file);
      // this.api.uploadFile(formData).subscribe((response:any)=>{
      //   this.body.vehicleImage=response.data.orignal 
      // })

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
      this.vehicleForm.controls['carLeftImage'].setValue(file)
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
    this.vehicleForm.controls['carRightImage'].setValue(file)
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
    this.vehicleForm.controls['carFrontImage'].setValue(file)
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
    this.vehicleForm.controls['carBackImage'].setValue(file)
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

  addVehicle(){
    this.isSubmitted = true
    let url = `admin/addVehicle`
    let obj = new FormData()
    obj.append('vehicleName', this.vehicleForm.value.vehicleName);
    obj.append('vehicleMake', this.vehicleForm.value.vehicleMake);
    obj.append('vehicleModel', this.vehicleForm.value.vehicleModel);
    obj.append('vehicleTypeId', this.vehicleForm.value.vehicleTypeId);
    obj.append('vehicleImage', this.vehicleForm.value.vehicleImage);
    obj.append('insuranceDocuments', this.vehicleForm.value.insuranceDocuments);
    obj.append('transmissionTypeId', this.vehicleForm.value.transmissionTypeId);
    obj.append('color', this.vehicleForm.value.color);
    obj.append('state', this.vehicleForm.value.state);
    obj.append('plateNumber', this.vehicleForm.value.plateNumber);
    obj.append('isHybrid', this.vehicleForm.value.isHybrid);
    obj.append('isElectric', this.vehicleForm.value.isElectric);
    obj.append('carFrontImage', this.vehicleForm.value.carFrontImage);
    obj.append('carBackImage', this.vehicleForm.value.carBackImage);
    obj.append('carLeftImage', this.vehicleForm.value.carLeftImage);
    obj.append('carRightImage', this.vehicleForm.value.carRightImage);
    obj.append('vehicalRegistration', this.vehicleForm.value.vehicalRegistration);
    obj.append('drivingCertificate', this.vehicleForm.value.drivingCertificate);
    
    if(this.vehicleForm.invalid) {
      this.toaster.errorToastr('Please fill all field correctly')
    }else if(this.vehicleForm.valid){
      this.api.postApi(url,obj).subscribe((response:any) => {
        console.log('ADD VEHICLE RESPONSE',response)
        if(response['success']) {
          this.isSubmitted = false
          this.toaster.successToastr(response.message)
          this.vehicleForm.reset()
          this.router.navigate(['/wingmen/vehicles'])
          
        } else {
          this.toaster.errorToastr(response.message)
        }
      }, error => {
        this.toaster.errorToastr(error.statusText)
       console.log(error,'Error')
      })
    }
    
  }
  getTransmissionType() {
    this.api.getTransmissionType().subscribe((response: any) => {
      this.getTransmissionType = response.data;
   
    })
  }
  getallVehicleType() {
    this.api.getallVehicleType().subscribe((response: any) => {
      this.vehicleTypeList = response.data;
    //  this.totalItems = response.count;
     // this.loading = false;
    }),error=>{
     // this.loading=false;
      this.errorToast(error);
    }
  }
}



