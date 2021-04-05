import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/services/auth.service';
 

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {

  constructor(private api:AuthService,private toaster:ToastrManager) { }

  ngOnInit() {
  }

  forgotPassword(f:NgForm){
   this.api.forgotPassword(f.value).subscribe((response:any)=>{
      if(!response.success) this.errorToast(response.message)
      else {
        this.successToast(response.message)
        document.getElementById('closeForgotModal').click();
        f.reset();
      }
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
