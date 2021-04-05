import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import base from 'src/app/services/api.service';


@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss']
})
export class VehicleModalComponent implements OnInit {
   
  @Input() indocument:any;
  @Input() vehicleDocs:any;
  @Input() images:any;
  @Input() owner:any;
  imageUrl=base;

  constructor() { }

  ngOnInit() {
    
  }

}
