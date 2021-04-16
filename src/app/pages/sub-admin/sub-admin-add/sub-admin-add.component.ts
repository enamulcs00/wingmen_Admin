import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router'
import base, { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-sub-admin-add',
  templateUrl: './sub-admin-add.component.html',
  styleUrls: ['./sub-admin-add.component.scss']
})
export class SubAdminAddComponent implements OnInit {
  imageUrl = "https://app.mywngmn.com";
  isSubmitted: Boolean = false
  image: any = ''
  defaultImage = "assets/img/defaultuser.jpg";
  form: FormGroup
  formData = new FormData()
  imageURL = base
  id: any = ''
  roles: Array<Object> = [
    {_id: '56tdfgfy646454', name: 'Admin'},
    {_id: '56tdfgfy646451', name: 'Support'},
    {_id: '56tdfgfy646452', name: 'Contact'},
    {_id: '56tdfgfy646453', name: 'Analytics'}
  ]

  constructor(
    private toaster: ToastrManager,
    private fb: FormBuilder,
    public service: ApiService,
    private activatedRoute: ActivatedRoute,
    private route:Router,
    
  ) { 
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/i)]],
      phone: ['', [Validators.required,Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ,Validators.maxLength(15),Validators.minLength(7)]],
      address: ['', [Validators.required]],
      image: [''],
      email: ['', [Validators.required, Validators.email,,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],
      read: [false],
      write: [false],
      edit: [false],
      delete: [false],
    })
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = param.id;
      if(this.id) this.getSubadmin();
    });
  }

  getSubadmin() {
    
    let url = `admin/getEditsubAdmin/${this.id}`
    this.service.getApi(url).subscribe((response:any) => {
      console.log(response,'Edit  sub',response['data'].access);

      this.form.get('image').setValue(response.data.subAdminImage)
      this.image  = response.data.subAdminImage
      console.log('Imgwhedwkew',this.image)
      this.form.patchValue({
        name: response['data'].name,
        image: response['data'].subAdminImage,
        email: response['data'].email,
        phone: response['data'].phone,
        address: response['data'].address,
        read: response['data'].access.read,
        write: response['data'].access.write,
        edit: response['data'].access.edit,
        delete: response['data'].access.delete
      })
      this.image = response['badge']
    }, error => {
      this.toaster.errorToastr(error['message'])
    })
  }

  save() {
    let access = {"read":this.form.value.read,"write":this.form.value.write,"edit":this.form.value.edit,"delete":this.form.value.delete}
    let url = `admin/editsubAdmin/${this.id}`
    this.isSubmitted = true
    if(this.form.invalid){
      this.toaster.errorToastr('Please fill all field correctly')
    }
    else if(this.form.valid){
      let obj = new FormData()
  obj.append('subAdminImage', this.form.value.image);
  obj.append('name', this.form.value.name);
  obj.append('address', this.form.value.address);
  obj.append('phone', this.form.value.phone);
  obj.append('email', this.form.value.email);
  obj.append('access',JSON.stringify(access));
      if(this.id) obj.append('id', this.id)
      this.service.putApi(url,obj).subscribe((response:any) => {
        if(response['success']) {
          this.route.navigate(['/wingmen/sub-admin'])
          this.toaster.successToastr(response.message)
          this.formData = new FormData()
          this.form.reset()
          this.id = ''
        } else {
          
          this.toaster.errorToastr(response.message)
        }
      }, error => {
        this.toaster.errorToastr(error.error.message)
      })
    } 
  }

  onImageSelect(e) {
    let file = e.target.files[0];
    this.form.get('image').setValue(file)
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.formData.append('subAdminImage', file);     
    } else {
      this.toaster.errorToastr('Selected file is not image.');
    }
  }
addSub(){
  this.isSubmitted = true
  // let obj = {
  //   name: this.form.value.name,
  //   subAdminImage: this.form.value.image,
  //   email: this.form.value.email,
  // }
  let access = {"read":this.form.value.read,"write":this.form.value.write,"edit":this.form.value.edit,"delete":this.form.value.delete}
  let obj = new FormData()
  obj.append('subAdminImage', this.form.value.image);
  obj.append('name', this.form.value.name);
  obj.append('email', this.form.value.email);
  obj.append('address', this.form.value.address);
  obj.append('phone', this.form.value.phone);
  obj.append('access',JSON.stringify(access));
  if(this.form.invalid) {
    this.toaster.errorToastr('Please fill all field correctly')
  }else if(this.form.valid){
    this.service.AddSubAdmin(obj).subscribe((response:any) => {
      console.log('SuB Admin',response)
      if(response['success']) {
        this.isSubmitted = false
        this.toaster.successToastr(response.message)
        this.form.reset()
        this.route.navigate(['/wingmen/sub-admin'])
        this.id = ''
      } else {
        this.toaster.errorToastr(response.message)
      }
    }, error => {
      this.toaster.errorToastr(error.error.message)
     
    })
  }
  
}
SubmitData(){
  if(this.id){
    this.save()
    console.log('Update called');
    
  }else{
    this.addSub()
    console.log('Add called');
    
  }
}

}
