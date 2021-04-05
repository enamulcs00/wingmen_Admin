import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';
import { ThemePalette } from '@angular/material/core';
import { FilterBody } from 'src/app/requests/driver-body';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-driver-pairing',
  templateUrl: './driver-pairing.component.html',
  styleUrls: ['./driver-pairing.component.scss']
})
export class DriverPairingComponent implements OnInit {

  temp: Object = {}
  imageUrl=base;
  pairedDrivers: Array<Object> = []
  driverList:any;
  driverListOriginal:any;
  coDriverList:any;
  coDriverListOriginal:any;
  loading: boolean = true;

  constructor(
    private api:ApiService,
    private toaster: ToastrManager    
  ) { }

  ngOnInit() {
    this.getDrivers()
    this.getCoDrivers()
  }

  getDrivers() {
    let body = {
      isPairedDriver: false,
      isPilot: true
    }
    this.api.getAllDrivers(body).subscribe(response => {
      this.driverList = JSON.parse(JSON.stringify(response['data']))
      this.driverListOriginal = JSON.parse(JSON.stringify(response['data']))
    })
  }

  filterData(val, type) {
    if(val.length > 2) {
      let regexp = new RegExp(val, 'i')
      if(type === 'driver') {
        this.driverList = this.driverListOriginal.filter(i => {
          return regexp.test(i['firstName']) || regexp.test(i['lasstName'])
        })
        if(!this.driverList.length) this.driverList = JSON.parse(JSON.stringify(this.driverListOriginal))
      } else {
        this.coDriverList = this.coDriverListOriginal.filter(i => {
          return regexp.test(i['firstName']) || regexp.test(i['lasstName'])
        })
        if(!this.coDriverList.length) this.coDriverList = JSON.parse(JSON.stringify(this.coDriverListOriginal))
      }
    } else {
      this.driverList = JSON.parse(JSON.stringify(this.driverListOriginal))
      this.coDriverList = JSON.parse(JSON.stringify(this.coDriverListOriginal))
    }
  }

  getCoDrivers() {
    let body = {
      isPairedDriver: false,
      isCopilot: true
    }
    this.api.getAllDrivers(body).subscribe(response => {
      this.coDriverList = JSON.parse(JSON.stringify(response['data']))
      this.coDriverListOriginal = JSON.parse(JSON.stringify(response['data']))
    })
  }

  formObj(i, type) {
    if(type == 'driver') {
      if(this.temp['driver']) {
        if(this.temp['driver']._id === i._id) {
          this.temp['driver'] = null
          return
        } else {
          return this.toaster.errorToastr('Please select a co-driver')
        }
      } else {
        this.temp['driver'] = i
      }
    } else {
      if(this.temp['codriver']) {
        if(this.temp['codriver']._id === i._id) {
          this.temp['codriver'] = null
          return
        } else {
          return this.toaster.errorToastr('Please select a driver')
        }
      } else {
        this.temp['codriver'] = i
      }
    }

    if(this.temp['driver'] && this.temp['codriver']) {
      this.pairedDrivers.push(this.temp)
      this.temp = {}
    }
  }

  isNotAdded(id, type) {
    if(type === 'driver') {
      let ind = this.pairedDrivers.findIndex(i => i['driver']._id === id)
      if(ind == -1) {
        return true
      } else {
        return false
      }
    } else {
      let ind = this.pairedDrivers.findIndex(i => i['codriver']._id === id)
      if(ind == -1) {
        return true
      } else {
        return false
      }
    }
  }

  isSelected(id, type) {
    if(type === 'driver') {
      if(this.temp['driver'] && this.temp['driver']._id === id){
        return true
      } else {
        return false
      }
    } else {
      if(this.temp['codriver'] && this.temp['codriver']._id === id){
        return true
      } else {
        return false
      }
    }
  }

  remove(id, type) {
    let ind = this.pairedDrivers.findIndex(i => i[type]._id === id)
    if(ind > -1) {
      this.pairedDrivers.splice(ind, 1)
    }
  }

  async save() {
    this.loading = true
    let arr = []
    let error = false
    this.pairedDrivers.map(i => {
      let obj = {}
      obj['codriverr'] = i['codriver']._id
      obj['driverr'] = i['driver']._id
      arr.push(obj)
    })
    for(let item of arr) {
      let resp = await this.pairDriver(item)
      if(resp === 'error') error = true
    }
    if(error) {
      this.toaster.errorToastr('Drivers pairing unsuccesfull')
    } else {
      this.pairedDrivers = []
      this.temp = {}
      this.getDrivers()
      this.getCoDrivers()
      this.toaster.successToastr('Drivers Paired succesfully')
    }
    this.loading = false
  }

  pairDriver(obj) {
    return new Promise( (resolve, reject) => {
      try{
        this.api.assignCoDriver(obj).subscribe(response => {
          if(response['success']) {
            resolve('success')
          } else {
            reject('error')
          }
        }, error => {
          reject('error')
        })    
      }catch(er) {
        console.log(er)
      }
    })
  }
}
