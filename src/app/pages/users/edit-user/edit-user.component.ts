import { Component, OnInit } from '@angular/core';
import { AddUserBody } from "src/app/requests/add-user-body";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import countryCode from 'src/app/requests/countrycode';
import { FilterBody } from 'src/app/requests/filter-body';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  history = window.history;
  body = new AddUserBody();
  filterBody=new FilterBody();
  userId: string;
  codes = [];
  lat:any;
  long:any;
  defaultImage = "assets/img/defaultuser.jpg";
  flags = {
    isUpdate: false
  };
  src: any;
  file: File;
  imageUrl = base;
  formData = new FormData();

  singleDropDownSetting: any = {
    enableCheckAll: false,
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toaster: ToastrManager
  ) { }

  ngOnInit() {
    this.codes = countryCode;
    this.activatedRoute.params.subscribe((param: any) => {
      this.userId = param.id;
      this.filterBody._id=this.userId
      this.getUserDetail();
    });
  }

    getUserDetail() {
      this.api.getAllUsers(this.filterBody).subscribe((response: any) => {    
        if (!response.success) return;
        const data=response.data[0];
        this.body = data;
        this.body.gender=this.body.gender.toUpperCase();
        this.src=data.image;
        this.userId = data._id;
        this.lat=data.latitude;
        this.long=data.longitude;
       
       });
    }
  
    onImageSelect(e) {
      const file = e.target.files[0];
      this.formData.delete('image');
      if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.src = event.target.result;
          this.imageUrl=''
        };
        reader.readAsDataURL(e.target.files[0]);
        this.file = file;
        this.formData.append('image', this.file);
      } else {
        this.errorToast('Selected file is not image.');
      }
    }
  
    editUser() { 
      if(this.body.firstName.trim()=="") return this.errorToast('Please enter First Name')
    if(this.body.lastName.trim()=="") return this.errorToast('Please enter Last Name')
    if(!this.body.address) return this.errorToast ('Please fill valid address');

    this.flags.isUpdate = true;
    this.formData.append('_id',this.userId)
    this.formData.append('firstName',this.body.firstName)
    this.formData.append('lastName',this.body.lastName)
    this.formData.append('email',this.body.email)
    this.formData.append('countryCode',this.body.countryCode)
    this.formData.append('phone',this.body.phone)
    this.formData.append('gender',this.body.gender)
    this.formData.append('address',this.body.address)
    this.formData.append('latitude',this.lat)
    this.formData.append('longitude',this.long) 
    this.formData.append('genderType',this.body.gender)    
    this.api.updateUser(this.formData).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        this.formData=new FormData();
        return this.errorToast(response.message);
      }
      this.formData=new FormData();
      this.successToast('User updated successfully!')
this.router.navigate(['wingmen/users'])
    }, error => {
      this.flags.isUpdate = false;
    });
  }
    
  
    handleAddressChange(address){
      this.body.address=address.formatted_address;
      this.lat=address.geometry.location.lat();
      this.long=address.geometry.location.lng();
   
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
  


