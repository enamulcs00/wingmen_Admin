import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
   resetForm: FormGroup;
   resetToken:any;
    submitted = false;

    constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,
       private router:Router,private api:AuthService,private toaster:ToastrManager) {
      activatedRoute.queryParams.subscribe((params) =>{ 
        this.resetToken= params['passwordResetToken'];
     })
    }

    ngOnInit() {
        this.resetForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.resetForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        }
        const data={
          password:this.resetForm.controls['password'].value,
          passwordResetToken:this.resetToken
        }
      this.api.resetPassword(data).subscribe((response:any)=>{
        if(!response.success) this.errorToast(response.message)
         this.successToast(response.message)
         this.router.navigateByUrl('/login')
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
