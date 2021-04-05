import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute } from '@angular/router'
import base, { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sub-admin-add',
  templateUrl: './sub-admin-add.component.html',
  styleUrls: ['./sub-admin-add.component.scss']
})
export class SubAdminAddComponent implements OnInit {

  isSubmitted: Boolean = false
  image: any = ''
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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    })
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = param.id;
      if(this.id) this.getSubadmin();
    });
  }

  getSubadmin() {
    this.service.getSubadminById({id: this.id}).subscribe(response => {
      this.form.patchValue({
        name: response['data'].name,
        image: response['data'].image,
        email: response['data'].email,
        role: response['data'].role
      })
      this.image = response['badge']
    }, error => {
      this.toaster.errorToastr(error['message'])
    })
  }

  save() {
    this.isSubmitted = true
    if(this.form.invalid) return true
    this.isSubmitted = false
    for(let key in this.form.value) {
      this.formData.append(key, this.form.value[key])
    }
    if(this.id) this.formData.append('id', this.id)
    this.service.updateSubAdmin(this.formData).subscribe(response => {
      if(response['success']) {
        this.toaster.successToastr('Success')
        this.formData = new FormData()
        this.form.reset()
      } else {
        this.toaster.errorToastr('Error')
      }
    }, error => {
      this.toaster.errorToastr('Error')
    })
  }

  onImageSelect(e) {
    let file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.formData.append('image', file);     
    } else {
      this.toaster.errorToastr('Selected file is not image.');
    }
  }

}
