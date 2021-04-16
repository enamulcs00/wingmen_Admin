import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { GetInterceptorService } from './interceptors/get-interceptor.service';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { CharacterOnlyDirective } from './directives/character-only/character-only.directive';
import { NumberOnlyDirective } from './directives/number-only/number-only.directive';
import { VehicletypeModalComponent } from './vehicletype/vehicletype-modal/vehicletype-modal.component';
import { ServicetypeComponent } from './servicetype/servicetype.component';
import { ServicetypeModalComponent } from './servicetype/servicetype-modal/servicetype-modal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TransmissiontypeComponent } from './transmissiontype/transmissiontype.component';
import { TransmissiontypeModalComponent } from './transmissiontype/transmissiontype-modal/transmissiontype-modal.component';
import { UsersComponent } from './users/users.component';
import { DriversComponent } from './drivers/drivers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AddVehicleComponent } from './vehicles/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './vehicles/edit-vehicle/edit-vehicle.component';
import { VehicleModalComponent } from './vehicles/vehicle-modal/vehicle-modal.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { EditDriverComponent } from './drivers/edit-driver/edit-driver.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { FullComponent } from '../components/full/full.component';
import { TeamComponent } from './team/team.component';
import { TeamModalComponent } from './team/team-modal/team-modal.component';
import { EventtypeComponent } from './eventtype/eventtype.component';
import { EventtypeModalComponent } from './eventtype/eventtype-modal/eventtype-modal.component';
import { AppversionComponent } from './appversion/appversion.component';
import { PromoComponent } from './promo/promo.component';
import { AddPromoComponent } from './promo/add-promo/add-promo.component';
import { EditPromoComponent } from './promo/edit-promo/edit-promo.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { StateComponent } from './state/state.component';
import { StateModalComponent } from './state/state-modal/state-modal.component';
import { SettingComponent } from './setting/setting.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BookingComponent } from './booking/booking.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BookingModalComponent } from './booking/booking-modal/booking-modal.component';
import { UserBookingComponent } from './users/user-booking/user-booking.component';
import { DriverBookingComponent } from './drivers/driver-booking/driver-booking.component';
import { EventBookingComponent } from './event-booking/event-booking.component';
import { EventBookingModalComponent } from './event-booking/event-booking-modal/event-booking-modal.component';
import { AgmCoreModule } from '@agm/core';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import { ContactusComponent } from './contactus/contactus.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, TimeSeries);
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DriverPairingComponent } from './driver-pairing/driver-pairing.component';
import { SubAdminListingComponent } from './sub-admin/sub-admin-listing/sub-admin-listing.component';
import { SubAdminAddComponent } from './sub-admin/sub-admin-add/sub-admin-add.component';
import { RolesListingComponent } from './sub-admin/roles-listing/roles-listing.component';
import { RolesAddComponent } from './sub-admin/roles-add/roles-add.component';
import { RankingListingComponent } from './ranking/ranking-listing/ranking-listing.component';
import { RankingAddComponent } from './ranking/ranking-add/ranking-add.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { UserListComponent } from './additional-admin/user-list/user-list.component';
import { UserAddComponent } from './additional-admin/user-add/user-add.component';
import { UserEditComponent } from './additional-admin/user-edit/user-edit.component';
import { UserViewComponent } from './additional-admin/user-view/user-view.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

    
@NgModule({
  declarations: [
    DashboardComponent, 
    PagesComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FullComponent,
    VehicletypeComponent,
    CharacterOnlyDirective,
    NumberOnlyDirective,
    VehicletypeModalComponent,
    ServicetypeComponent,
    ServicetypeModalComponent,
    TransmissiontypeComponent,
    TransmissiontypeModalComponent,
    UsersComponent,
    DriversComponent,
    VehiclesComponent,
    AddVehicleComponent,
    EditVehicleComponent,
    VehicleModalComponent,
    AddDriverComponent,
    EditDriverComponent,
    EditUserComponent,
    TeamComponent,
    TeamModalComponent,
    EventtypeComponent,
    EventtypeModalComponent,
    AppversionComponent,
    PromoComponent,
    AddPromoComponent,
    EditPromoComponent,
    AddUserComponent,
    StateComponent,
    StateModalComponent,
    SettingComponent,
    BookingComponent,
    BookingModalComponent,
    UserBookingComponent,
    DriverBookingComponent,
    EventBookingComponent,
    EventBookingModalComponent,
    ContactusComponent,
    BroadcastComponent,
    DriverPairingComponent,
    SubAdminListingComponent,
    SubAdminAddComponent,
    RolesListingComponent,
    RolesAddComponent,
    RankingListingComponent,
    RankingAddComponent,
    SubAdminComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserViewComponent
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    UiSwitchModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    PagesRoutingModule,
    GooglePlaceModule,
    NgxDocViewerModule,
    PdfViewerModule,
    AgmCoreModule,
    FusionChartsModule,
    MatCheckboxModule,

    AngularMultiSelectModule,
    NgMultiSelectDropDownModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GetInterceptorService, multi: true }
  ],
})
export class PagesModule { }
