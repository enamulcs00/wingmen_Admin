import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import base, { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ranking-add',
  templateUrl: './ranking-add.component.html',
  styleUrls: ['./ranking-add.component.scss']
})
export class RankingAddComponent implements OnInit {

  isSubmitted: Boolean = false
  image: any = ''
  form: FormGroup
  formData = new FormData()
  imageURL = base
  id: any = ''
  constructor(
    private toaster: ToastrManager,
    private fb: FormBuilder,
    public service: ApiService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      badge: ['', Validators.required],
      minTime: ['', Validators.required],
      minRating: ['', Validators.required],
      minRides: ['', Validators.required],
    })
  }

  getRanking() {
    this.service.getRankingById({id: this.id}).subscribe(response => {
      this.form.patchValue({
        name: response['data'].name,
        badge: response['data'].badge,
        minTime: response['data'].minTime,
        minRides: response['data'].minRides,
        minRating: response['data'].minRating,
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
    this.service.updateRanking(this.formData).subscribe(response => {
      if(response['success']) {
        this.toaster.successToastr('Success')
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
