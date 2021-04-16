import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { ServicetypeComponent } from './servicetype/servicetype.component';
import { TransmissiontypeComponent } from './transmissiontype/transmissiontype.component';
import { UsersComponent } from './users/users.component';
import { DriversComponent } from './drivers/drivers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AddVehicleComponent } from './vehicles/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './vehicles/edit-vehicle/edit-vehicle.component';
import { TeamComponent } from './team/team.component';
import { EventtypeComponent } from './eventtype/eventtype.component';
import { AppversionComponent } from './appversion/appversion.component';
import { PromoComponent } from './promo/promo.component';
import { AddPromoComponent } from './promo/add-promo/add-promo.component';
import { EditPromoComponent } from './promo/edit-promo/edit-promo.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { EditDriverComponent } from './drivers/edit-driver/edit-driver.component';
import { StateComponent } from './state/state.component';
import { SettingComponent } from './setting/setting.component';
import { BookingComponent } from './booking/booking.component';
import { UserBookingComponent } from './users/user-booking/user-booking.component';
import { DriverBookingComponent } from './drivers/driver-booking/driver-booking.component';
import { DriverPairingComponent } from './driver-pairing/driver-pairing.component';
import { EventBookingComponent } from './event-booking/event-booking.component';
import { ContactusComponent } from './contactus/contactus.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { SubAdminListingComponent } from './sub-admin/sub-admin-listing/sub-admin-listing.component';
import { SubAdminAddComponent } from './sub-admin/sub-admin-add/sub-admin-add.component';
import { RankingListingComponent } from './ranking/ranking-listing/ranking-listing.component';
import { RankingAddComponent } from './ranking/ranking-add/ranking-add.component';
import { RolesListingComponent } from './sub-admin/roles-listing/roles-listing.component';
import { RolesAddComponent } from './sub-admin/roles-add/roles-add.component';
import { UserListComponent } from './additional-admin/user-list/user-list.component';
import { UserAddComponent } from './additional-admin/user-add/user-add.component';
import { UserEditComponent } from './additional-admin/user-edit/user-edit.component';



const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path:'dashboard', component: DashboardComponent, data: { key: 'hasDashboard' } },
      {path:'VehicleType', component : VehicletypeComponent, data: { key: 'hasVehicleType' } },
      {path:'ServiceType', component : ServicetypeComponent, data: { key: 'hasServiceType' } },
      {path:'TransmissionType', component : TransmissiontypeComponent, data: { key: 'hasTransmissionType' } },
      {path:'users', component : UsersComponent, data: { key: 'hasUsers' } },
      {path:'users/add-user', component : AddUserComponent, data: { key: 'hasUsers' } },
      {path:'users/edit-user/:id', component : EditUserComponent, data: { key: 'hasUsers' } },
      {path:'users/booking-history/:id', component : UserBookingComponent, data: { key: 'hasUsers' } },
      {path:'drivers-pairing', component : DriverPairingComponent, data: { key: 'hasDriver' } },
      {path:'drivers', component : DriversComponent, data: { key: 'hasDriver' } },
      {path:'drivers/add-driver', component : AddDriverComponent, data: { key: 'hasDriver' } },
      {path:'drivers/edit-driver/:id', component : EditDriverComponent, data: { key: 'hasDriver' } },
      {path:'drivers/booking-history/:id', component : DriverBookingComponent, data: { key: 'hasDriver' } },
      {path:'vehicles', component : VehiclesComponent, data: { key: 'hasVehicle' } },
      {path:'vehicles/add-vehicle', component : AddVehicleComponent, data: { key: 'hasVehicle' } },
      {path:'vehicles/edit-vehicle/:id', component : EditVehicleComponent, data: { key: 'hasVehicle' } },
      {path:'team', component : TeamComponent, data: { key: 'hasTeam' } },
      {path:'event-type', component : EventtypeComponent, data: { key: 'hasEventType' } },
      {path:'cms', component : AppversionComponent, data: { key: 'hasCMS' } },
      {path:'coupon', component : PromoComponent, data: { key: 'haPromo' } },
      {path:'coupon/add-coupon', component : AddPromoComponent, data: { key: 'haPromo' } },
      {path:'coupon/edit-coupon/:id', component : EditPromoComponent, data: { key: 'haPromo' } },
      {path:'state', component : StateComponent, data: { key: 'hasState' } },
      {path:'setting', component : SettingComponent, data: { key: 'hasSetting' } },
      {path:'booking', component : BookingComponent, data: { key: 'hasBooking' } },
      {path:'event-booking', component:EventBookingComponent, data: { key: 'hasEventBooking' } },
      {path:'contact-us', component:ContactusComponent, data: { key: 'hasContactUs' } },
      {path:'broadcast', component:BroadcastComponent, data: { key: 'hasBroadcast' } },
      {path:'sub-admin', component: SubAdminListingComponent, data: { key: 'hasSubAdmin' } },
      {path:'sub-admin/add', component: SubAdminAddComponent, data: { key: 'hasSubAdmin' } },
      {path:'sub-admin/add/:id', component: SubAdminAddComponent, data: { key: 'hasSubAdmin' }},
      {path:'roles', component: RolesListingComponent, data: { key: 'hasSubAdmin' } },
      {path:'roles/add', component: RolesAddComponent, data: { key: 'hasSubAdmin' } },
      {path:'roles/add/:id', component: RolesAddComponent, data: { key: 'hasSubAdmin' } },
      {path:'ranking', component: RankingListingComponent, data: { key: 'hasRanking' } },
      {path:'ranking/add', component: RankingAddComponent, data: { key: 'hasRanking' } },
      {path:'ranking/add/:id', component: RankingAddComponent, data: { key: 'hasRanking' } },
      {path:'user-list', component: UserListComponent, data: { key: 'hasUserList' } },
      {path:'user-add', component: UserAddComponent, data: { key: 'hasUserAdd' } },
      {path:'user-edit/:id', component: UserEditComponent, data: { key: 'hasUserEdit' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
