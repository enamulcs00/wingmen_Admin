import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/internal/operators";
import io from "socket.io-client";
import { Observable } from 'rxjs';

let base = "";
export default base = "https://app.mywngmn.com/";

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  imageUrl = "https://app.mywngmn.com/";
  baseUrl = "https://app.mywngmn.com";
  socket: any;

  //78 115 223  

  constructor(private http: HttpClient) {
    this.connectSocket()
   }


  connectSocket()
  {
    this.socket = io.connect(this.imageUrl, {
      reconnection: true,
      reconnectionDelay: 30000,
      reconnectionDelayMax: 60000,
      reconnectionAttempts: Infinity,
    });
    console.log('connected',this.socket);
  }

  checkliveloca(bookingId)
  {
      this.socket.emit('trackDriver',bookingId)
      return Observable.create((observer) => {
        this.socket.removeListener("addAdmin");
        this.socket.on("addAdmin", (message) => {
          
          observer.next(message);
        });
      });
    
  }

  //image upload
  uploadFile(file) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/uploadFile`, file)
  }

  //dashboard api
  getDashboardCount() {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getDashboardCount`)
  }

  getRevenueData(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getRevenue`, body)
  }

  //User api
  getUserDetail(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getAllVehicleUser`, body)
  }

  //User Api
  getAllUsers(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getAllUsers`, body)
  }

  addUser(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/registerUser`, body)
  }

  updateUser(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/updateUser`, body)
  }

  verifyBlockUnBlockDeltedUser(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/verifyBlockUnBlockDeleteUser`, body)
  }
  //Vehicle Type api
  getallVehicleType() {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getVehicleType`)
  }
  addVehicleType(data) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/addVehicleType`, data)
  }

  updateVehicleType(data) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/editVehicleType`, data)
  }

  deleteVehicleType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/blockUnblockDeleteVehicleType`, body)
  }

  //Vehicle Service Type api
  getallServiceType() {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getServiceType`)
  }

  addServiceType(data) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/addServiceType`, data)
  }

  updateServiceType(data) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/editServiceType`, data)
  }

  deleteServiceType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/blockUnblockDeleteServiceType`, body)
  }

  //Transmission Type api
  getTransmissionType() {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getTransmissionType`)
  }

  addTransmissionType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/addTransmissionType`, body)
  }

  editTransmissionType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/editTransmissionType`, body)
  }

  blockDeleteTransmissionType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/blockUnblockDeleteTransmissionType`, body)
  }

  //Event type api
  getEventType() {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getEventType`)
  }

  addEventType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/addEventType`, body)
  }

  editEventType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/editEventType`, body)
  }

  blockDeleteEventType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/blockUnblockDeleteEventType`, body)
  }

  // Team api
  getTeam() {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getTeam`)
  }

  addTeam(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/addTeam`, body)
  }

  editTeam(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/editTeam`, body)
  }

  blockUnblockDeleteTeam(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/blockUnblockDeleteTeam`, body)
  }

  //Vehicle api
  getallVehicle(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getAllVehicle`, body)
  }

  updateVehicle(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/updateDocuments`, body)
  }

  blockUnblockDeleteVehicleType(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/blockUnblockDeleteVehicleType`, body)
  }



  //driver Api
  assignCoDriver(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/assignCoDriver`, body)
  }

  getAllDrivers(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getAllDrivers`, body)
  }

  addDriver(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/driverRegister`, body)
  }

  editDriver(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/updateDriverProfile`, body)
  }

  verifyBlockUnBlockDeltedDriver(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/verifyBlockUnBlockDeltedDriver`, body)
  }

  //Promo code apis
  getallPromoCode(id) {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getAllPromoCode?_id=${id}`)
  }

  addPromo(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/addPromoCode`, body)
  }

  editPromo(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/editPromoCode`, body)
  }

  deletePromoCode(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/deleteBlockPromoCode`, body)
  }

  //state api
  getStates() {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getState`)
  }

  addState(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/addState`, body)
  }

  editState(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/editState`, body)
  }

  deleteState(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/blockUnblockDeleteState`, body)
  }

  //Version api
  getAppVersion() {
    return this.http.get(`${this.baseUrl}/api/v1/admin/getAppVersion`)
  }


  setAppVersion(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/setAppVersion`, body)
  }

  // setting api
  getAdminProfile(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getProfile`, body)
  }

  updateAdminProfile(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/updateAdminProfile`, body)
  }

  //booking api
  getAllBooking(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getAllBooking`, body)
  }

  initiateRefund(id, body) {
    return this.http.put(`${this.baseUrl}/api/v1/admin/editBooking/${id}`, body)
  }

  getBookingDetails(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getBookingDetails`, body)
  }

  bookingStatus(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/acceptedBookingStatus`, body)
  }

  getAllAvailableDriver(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getAllAvailableDriver`, body)
  }

  eventBookingStatus(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/acceptedCancelCompleteEventBookingStatus`, body)
  }

  // ContactUs api
  getContactUs(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getContactUs`, body)
  }

  //Bulk notification
  sendBulkNotification(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/sendBulkNotification`, body);
  }

  /***** RANKINGS *****/
  getRankings(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getRankings`, body);
  }

  updateRanking(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/updateRanking`, body);
  }

  getRankingById(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getRankingById`, body);
  }


  /***** SUB-ADMIN *****/
  getSubadmins(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getSubadmins`, body);
  }
  getByPost(url,body) {
    return this.http.post(`${this.baseUrl}/api/v1/${url}`, body);
  }
  delByPost(url,body) {
    return this.http.post(`${this.baseUrl}/api/v1/${url}`, body);
  }
  updateSubAdmin(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/updateSubadmin`, body);
  }
  AddSubAdmin(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/addsubAdmin`, body);
  }

  getSubadminById(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getSubadminById`, body);
  }
  putApi(url,data) {
    return this.http.put(`${this.baseUrl}/api/v1/${url}`,data);
  }
  postApi(url,data) {
    return this.http.post(`${this.baseUrl}/api/v1/${url}`,data);
  }
  getApi(url) {
    return this.http.get(`${this.baseUrl}/api/v1/${url}`);
  }

  /***** ROLES/CAPABILITIES *****/
  getRoles(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getRoles`, body);
  }

  updateRole(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/updateRole`, body);
  }

  getRoleById(body) {
    return this.http.post(`${this.baseUrl}/api/v1/admin/getRoleById`, body);
  }

}
