import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app-component/app.component';
import {EmployeeCreateComponent} from './components/employee-create/employee-create.component';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    LoginComponent,
    ButtonDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    AmazingTimePickerModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    DpDatePickerModule,
    MatNativeDateModule
  ],
  providers: [LoginServiceService, MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginServiceService} from './components/app-component/login-service.service';
import {LoginComponent} from './components/login/login.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ButtonDetailComponent} from './components/employee-list/button-details.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DpDatePickerModule} from 'ng2-date-picker';

