import { Component, OnInit, ViewChild } from '@angular/core';
 import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import { ThemePalette } from '@angular/material/core';
 import { DeleteBody } from 'src/app/requests/delete-body';
import { FilterBody } from 'src/app/requests/filter-body';
import { TeamModalComponent } from './team-modal/team-modal.component';
 
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  deleteBody=new DeleteBody();
  filterBody=new FilterBody();
  serialNumber = 0;
  totalItems: number;
  currentPage: number;
  teamList;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  flags = {
    isEdit: false
  };

  @ViewChild(TeamModalComponent, { static: false }) public modalComponent: TeamModalComponent;
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip=0;
    this.getTeam()
  }

  getTeam() {
    this.api.getTeam().subscribe((response: any) => {
      this.teamList = response.data;
      this.totalItems = response.count;
      this.loading = false;
    })
  }

  

  pageChange(pages){
    // this.currentPage=pages.page;
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getTeam();
    this.serialNumber=currentPage*10-10;
  }


  //block Delete TransmissionType
    
   deleteTeam(id){ 
       Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Team!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
       const data={
         isDeleted:true,
         _id:id
       }
        this.api.blockUnblockDeleteTeam(data).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Team has been deleted!',
            icon: 'success'
          })
          this.getTeam();  
        })
      }
    
    })
  }
  
  changeblockStatus(item){
   
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Block/UnBlock this Team!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        const data={
          isBlocked:item.isBlocked,
          _id:item._id
        }
        this.api.blockUnblockDeleteTeam(data).subscribe((res: any) => {
          if (!res.success) return;     
        })
      }
      this.getTeam();
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


