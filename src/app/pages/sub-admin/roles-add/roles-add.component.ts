import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute } from '@angular/router'
import base, { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-roles-add',
  templateUrl: './roles-add.component.html',
  styleUrls: ['./roles-add.component.scss']
})
export class RolesAddComponent implements OnInit {

  isSubmitted: Boolean = false
  image: any = ''
  form: FormGroup
  formData = new FormData()
  imageURL = base
  id: any = ''
  capabilities: Array<Object> = []
  settings: Object = {}
  selectedItems: Array<Object> = []

  constructor(
    private toaster: ToastrManager,
    private fb: FormBuilder,
    public service: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.capabilities = [
      { name: 'Dashboard', value: 'hasDashboard' },
      { name: 'Vehicle Type', value: 'hasVehicleType' },
      { name: 'Event Type', value: 'hasEventType' },
      { name: 'Service Type', value: 'hasServiceType' },
      { name: 'Transmission Type', value: 'hasTransmissionType' },
      { name: 'Users', value: 'hasUsers' },
      { name: 'Drivers', value: 'hasDriver' },
      { name: 'Vehicle', value: 'hasVehicle' },
      { name: 'Team', value: 'hasTeam' },
      { name: 'CMS', value: 'hasCMS' },
      { name: 'Promo', value: 'hasPromo' },
      { name: 'State', value: 'hasState' },
      { name: 'Setting', value: 'hasSetting' },
      { name: 'Booking', value: 'hasBooking' },
      { name: 'Event Booking', value: 'hasEventBooking' },
      { name: 'Contact Us', value: 'hasContactUs' },
      { name: 'Broadcast', value: 'hasBroadcast' },
      { name: 'Subadmin', value: 'hasSubAdmin' },
      { name: 'Ranking', value: 'hasRanking' },
    ]

    this.form = this.fb.group({
      name: ['', Validators.required],
      capabilities: [['hasDashboard'], Validators.required]
    })
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = param.id;
      if (this.id) this.getRole();
    });
  }

  getRole() {
    this.service.getRoleById({ id: this.id }).subscribe(response => {
      this.form.patchValue({
        name: response['data'].name,
        capabilities: response['data'].capabilities
      })
    }, error => {
      this.toaster.errorToastr(error['message'])
    })
  }

  save() {
    console.log(this.form.value)
    this.isSubmitted = true
    if (this.form.invalid) return true
    this.isSubmitted = false
    for (let key in this.form.value) {
      this.formData.append(key, this.form.value[key])
    }
    if (this.id) this.formData.append('id', this.id)
    this.service.updateSubAdmin(this.formData).subscribe(response => {
      if (response['success']) {
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
