import { Component, OnInit } from '@angular/core';
import { AddUserBody } from 'src/app/requests/add-user-body';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import countryCode from 'src/app/requests/countrycode';
import base from 'src/app/services/api.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  history = window.history;
  body = new AddUserBody();
  codes = [];
  defaultImage = "assets/img/defaultuser.jpg";
  countryCode: any;
  lat:any;
  long:any;
  flags = {
    isAdded: false
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
    
    // countryCode.forEach(ele => {
    //   this.codes.push({ item_id: ele.name, item_text: ele.dial_code })
    // })
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
     
    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  addUser() {
    if(this.body.firstName.trim()=="") return this.errorToast('Please enter First Name')
    if(this.body.lastName.trim()=="") return this.errorToast('Please enter Last Name')
    if(!this.body.address) return this.errorToast ('Please fill valid address');

    this.flags.isAdded = true;
    for(var key in this.body){
      this.formData.append(key,this.body[key])
    }
    this.formData.append('image', this.file);
    this.formData.append('latitude',this.lat)
    this.formData.append('longitude',this.long) 
    this.formData.append('genderType',this.body.gender)    
    this.api.addUser(this.formData).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.formData=new FormData();
        return this.errorToast(response.message);
      
      }
      this.successToast('User add successfully!')
      this.router.navigate(['wingmen/users'])

    }, error => {
      this.flags.isAdded = false;
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
