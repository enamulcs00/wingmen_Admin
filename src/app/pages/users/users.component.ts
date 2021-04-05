import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { ThemePalette } from '@angular/material/core';
import { FilterBody } from 'src/app/requests/filter-body';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DeleteBody } from 'src/app/requests/delete-body';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  imageUrl = base;
  userList: any;
  totalItems: any;
  loading: boolean = true;
  defaultImage = "assets/img/defaultuser.jpg";
  color: ThemePalette = 'primary';
  serialNumber: any = 0;
  selectUser: any;
  filterBody = new FilterBody();
  deleteBody = new DeleteBody();

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip = 0;
    this.getallUser()
  }

  getallUser() {
    this.api.getAllUsers(this.filterBody).subscribe((response: any) => {
      this.userList = response.data;
      this.loading = false;
      this.totalItems = response.count;
    })
  }


  blockDeleteUser(item) {
    const data = {
      isBlocked: item.isBlocked,
      _id: item._id
    }
    this.api.verifyBlockUnBlockDeltedUser(data).subscribe((res: any) => {
      if (!res.success) return;
      this.successToast('Status changed successfully')
      // this.getallUser();
    })
  }

  approveUser(item) {
    this.loading = true
    const data = {
      isVerified: true,
      _id: item._id
    }
    this.api.verifyBlockUnBlockDeltedUser(data).subscribe((res: any) => {
      this.loading = false
      if (!res.success) {
        this.errorToast(res['message'])
        return
      }
      this.successToast(res['message'])
    })
    this.getallUser();
  }

  searchUser() {
    this.filterBody.search = this.selectUser.trim();
    this.filterBody.skip = 0;
    this.getallUser();
  }

  reset() {
    this.selectUser = '';
    this.filterBody.search = undefined;
    this.filterBody.skip = 0;
    this.getallUser();
  }

  deleteUser(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        const data = {
          isDeleted: true,
          _id: id
        }
        this.api.verifyBlockUnBlockDeltedUser(data).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Vehicle Type has been deleted!',
            icon: 'success'
          })
          this.getallUser();
        })
      }

    })
  }


  pageChange(pages) {
    // this.currentPage=pages.page;
    const currentPage = pages.page
    this.filterBody.skip = currentPage * 10 - 10;
    this.filterBody.limit = 10;
    this.getallUser();
    this.serialNumber = currentPage * 10 - 10;
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
