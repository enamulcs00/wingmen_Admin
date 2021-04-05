import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FilterBody } from 'src/app/requests/filter-body';
declare var $: any;

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  type = '';
  userId: any = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  filterBody = new FilterBody();
  totalItems: any;
  index: any;
  pageno: any = 0
  itemList = [];
  settings = {};
  loading = false;
  indices: any;
  readonly bufferSize: number = 10;

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.filterBody.skip = 0;
    this.filterBody.limit = 10000
    this.itemList = [];
    this.selectedItems = [];
    

    this.settings = {
      text: "Select Users",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class",
      enableSearchFilter: true,
      searchBy: ['itemName'],
      labelKey: 'itemName'
    };

  }

  getUsers() {
    this.api.getAllUsers(this.filterBody).subscribe((res: any) => {
      if (res['data'].length) {
        res['data'].map(i => {
          let obj = {
            id: i._id,
            itemName: `${i.firstName} ${i.lastName}`
          }
          this.itemList.push(obj)
        })
      }
      this.loading = false
    })
  }

  getDrivers() {
    this.api.getAllDrivers(this.filterBody).subscribe((res: any) => {
      if (res['data'].length) {
        res['data'].map(i => {
          let obj = {
            id: i._id,
            itemName: `${i.firstName} ${i.lastName}`
          }
          this.itemList.push(obj)
        })
      }
      this.loading = false
    })
  }

  getallUser() {
    if (this.pageno <= this.totalItems) {
      this.api.getAllUsers(this.filterBody).subscribe((response: any) => {
        var userData = response.data
        var nextData = userData.map(res =>
          ({ id: res._id, itemName: `${res.firstName} ${res.lastName}` })
        )
        for (let item of nextData) {
          this.itemList.push(item);
        }
        this.pageno = this.pageno + 1;
        this.filterBody.skip = this.pageno * 10;
        this.getallUser();
      });
    }
    else return
  }

  onScroll(e: any) {
  }
  onOpen(event) {
  }

  fetchMore(event: any) {
    if (event.endIndex != -1 && event.endIndex === this.itemList.length - 1) {
      // this.loading = true;
      this.filterBody.skip = (event.endIndex + 1) / 10;

      this.api.getAllUsers(this.filterBody).subscribe((response: any) => {
        var userData = response.data
        this.pushData(userData)

      }
        ,
        () => this.loading = false);
    }
  }


  async pushData(userData) {
    let mapdata = await this.mapData(userData);
    let checkData = await this.checkData(mapdata)
  }

  mapData(userData) {
    let nextUser = userData.map(res =>
      ({ id: res._id, itemName: res.firstName + res.lastName })
    )
    return nextUser;
  }

  checkData(mapdata) {
    let itemId = mapdata[0].id
    if (this.itemList.indexOf(itemId == -1)) {
      for (let item of mapdata) {
        this.itemList.push(item)
      }
    }
  }



  changeData() {
    this.selectedItems = [];
  }



  pushBroadCast(f: NgForm) {
    if (this.userId.length) {
      f.value.userId = this.userId;
    }
    this.loading = true
    this.api.sendBulkNotification(f.value).subscribe((Response: any) => {
      if (!Response.success) return this.errorToast(Response.message)
      this.successToast(Response.message);
      this.userId = '';
      this.selectedItems = [];
      f.reset();
      this.loading = false
    })
  }

  changeUserType(type, f: NgForm) {
    this.loading = true;
    this.itemList = []
    f.value.userId = []
    if(type == 'DRIVER') {
      this.getDrivers()
    } else if(type == 'USER'){
      this.getUsers()
    } else {
      this.getUsers()      
      this.getDrivers()      
    }
  }

  onItemSelect(item: any) {
    this.userId.push(item.id)
  }

  OnItemDeSelect(item: any) {
    const index = this.userId.indexOf(item.id);
    if (index > -1) {
      this.userId.splice(index, 1);
    }
  }
  onSelectAll(items: any) {
    for (let item of items) {
      this.userId.push(item.id)
    }
  }
  onDeSelectAll(items: any) {
    this.userId = items
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
