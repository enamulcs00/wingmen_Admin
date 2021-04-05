import { Component, OnInit } from '@angular/core';
import * as js from '../../../assets/js/custom';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  path = "assets/img"
  menuItems = [
    { path: '/wingmen/dashboard', title: 'Dashboard', icon: 'assets/img/dashboard.png', class: '', key: 'hasDashboard' },
    { path: '/wingmen/sub-admin', title: 'Sub-Admin', icon: 'assets/img/subadmin.png', class: '', key: 'hasSubAdmin' },
    { path: '/wingmen/users', title: 'Users', icon: 'assets/img/user.png', class: '', key: 'hasUsers' },
    { path: '/wingmen/VehicleType', title: 'Vehicle Type', icon: 'assets/img/vehicletype.png', class: '', key: 'hasVehicleType' },
    { path: '/wingmen/ServiceType', title: 'Service Type', icon: 'assets/img/servicetype.png', class: '', key: 'hasServiceType' },
    { path: '/wingmen/TransmissionType', title: 'Transmission Type', icon: 'assets/img/transmission.png', class: '', key: 'hasTransmissionType' },
    { path: '/wingmen/event-type', title: 'Event Type', icon: 'assets/img/event.png', class: '', key: 'hasEventType' },
    { path: '/wingmen/state', title: 'State', icon: 'assets/img/state.png', class: '', key: 'hasState' },
    { path: '/wingmen/booking', title: 'Booking', icon: 'assets/img/booking.png', class: '', key: 'hasBooking' },
    { path: '/wingmen/event-booking', title: 'Event Booking', icon: 'assets/img/EventBooking.png', class: '', key: 'hasEventBooking' },
    { path: '/wingmen/vehicles', title: 'Vehicle', icon: 'assets/img/vehicle.png', class: '', key: 'hasVehicles' },
    { path: '/wingmen/team', title: 'Team', icon: 'assets/img/team.png', class: '', key: 'hasTeam' },
    { path: '/wingmen/drivers', title: 'Driver', icon: 'assets/img/driver.png', class: '', key: 'hasDrivers' },
    { path: '/wingmen/drivers-pairing', title: 'Driver Pairing', icon: 'assets/img/driver-pairing.png', class: '', key: 'hasDrivers' },
    { path: '/wingmen/ranking', title: 'Ranking', icon: 'assets/img/ranking.png', class: '', key: 'hasRanking' },
    { path: '/wingmen/coupon', title: 'Coupon', icon: 'assets/img/coupon.png', class: '', key: 'hasPromo' },
    { path: '/wingmen/cms', title: 'CMS', icon: 'assets/img/version.png', class: '', key: 'hasCMS' },
    { path: '/wingmen/setting', title: 'Setting', icon: 'assets/img/setting.png', class: '', key: 'has' },
    { path: '/wingmen/contact-us', title: 'Contact Us', icon: 'assets/img/contactus.png', class: '', key: 'hasSetting' },
    { path: '/wingmen/broadcast', title: 'Broadcast', icon: 'assets/img/notification.png', class: '', key: 'hasBroadcast' },

  ];

  constructor() {

  }

  ngOnInit() {
    js.customScript();
  }

}
