export class BookingBody {
    limit: number = 10;
    skip: number = 0;
    search: string;
    userId:string;
    driverId:string;
    isUpcommingbookings:boolean=false;
    isPastbookings:boolean=false;
    isEventBooking:boolean=false;
    // category: string;
    // role: string;
    // status: any;
    // subCategory: string;
  }
  