import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GetInterceptorService } from './pages/interceptors/get-interceptor.service';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ApiService } from './services/api.service';
 
@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMrKj9G0-f3QPF-P1D99iBChHT-PIICwo',
      libraries: ["geometry", "places", "drawing"]
    }),
    AppRoutingModule,
   ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:GetInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
