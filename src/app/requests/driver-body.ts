export class DriverBody {
  image:any;
  firstName: string;
  lastName: string;
  email: string;
  countryCode:string='';
  gender:string=''
  carStatus:boolean=false;
  driverLisence:string;
  isTransmissionType:boolean=false;
  password: string;
  phone: string;
  address: any;
  ssn:any;
  _id: string;
  // city: string;
  // street: string;
  // country: string;
  // state: string;
  // pinCode: string;
 
}

export class FilterBody {
  limit: number = 10;
  skip: number = 0;
  search: string;
  _id:string;
  isCopilot:boolean=undefined;
  isPilot:boolean=undefined;
}

