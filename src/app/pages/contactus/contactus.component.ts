import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ApiService } from 'src/app/services/api.service';
import { FilterBody } from 'src/app/requests/filter-body';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contactList:any;
  totalItems:any;
  selectedContact:any='';
  loading: boolean = true;
  color: ThemePalette = 'primary';
  serialNumber:any=0;

  filterBody=new FilterBody();
  
  constructor(private api:ApiService) { }

  ngOnInit() {
   this.getContactUsList();
  }

  getContactUsList(){
    this.api.getContactUs(this.filterBody).subscribe((response:any)=>{
      this.loading=false;
      this.contactList=response.data;
    })
  }

  searchDriver(){
    this.filterBody.search=this.selectedContact.trim();
    this.filterBody.skip=0;
    this.getContactUsList();
  }

  reset(){
    this.selectedContact=''
    this.filterBody.search='';
    this.filterBody.skip=0;
    this.getContactUsList();
  }

  pageChange(pages){
    const currentPage=pages.page
    this.filterBody.skip=currentPage*10-10;
    this.filterBody.limit=10;
    this.getContactUsList();
    this.serialNumber=currentPage*10-10;
  }


}
