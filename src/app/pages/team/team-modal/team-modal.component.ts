import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import base from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {

  @Input() isEdit: boolean;
  // @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();

  teamName:any;
  teamMembers:any;
  id:any;

  flags = {
    isAdded: false,
    isUpdate: false
  };
 
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
  }

  onEditSelect(data) {
     this.teamName=data.teamName
     this.teamMembers=data.teamMembers
     this.id=data._id;
    this.isEdit = true;
    
    // this.formData.append('id', data._id);
    document.getElementById('openTeamModal').click();
  }

  addTeam() {
    if(this.teamName.trim()=="") return this.errorToast('Please enter Team Name')
    if(this.teamMembers.trim()=="") return this.errorToast('Please enter Team Members')

     this.flags.isAdded = true;
     const data={
       teamName:this.teamName,
       teamMembers:this.teamMembers
     }
    this.api.addTeam(data).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.teamName='';
        this.teamMembers=''
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Team added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }

  editTeam() {
    if(this.teamName.trim()=="") return this.errorToast('Please enter Team Name')
    if(this.teamMembers.trim()=="") return this.errorToast('Please enter Team Members')
    this.flags.isUpdate = true;
    const data={
      teamName:this.teamName,
      teamMembers:this.teamMembers,
      _id:this.id
    }
     this.api.editTeam(data).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Team updated successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  onCancel() {
    this.teamName='';
    this.teamMembers=''
    this.isEdit = false;
    document.getElementById('closeTeamModal').click();
  }
  error = message => {
    this.errorToast(message);
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
