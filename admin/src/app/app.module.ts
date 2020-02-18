// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './main/app.component';
import { ToplogoComponent } from './common/toplogo/toplogo.component';
import { TopbarComponent } from './common/topbar/topbar.component';

// Pages
import { CreateEditUserComponent } from './pages/users/create-edit-user/create-edit-user.component';
import { ListPublicationComponent } from './pages/publications/list-publication/list-publication.component';
import { LoginAdminComponent } from './pages/sesions/login-admin/login-admin.component';
import { CreateEditPublicationComponent } from './pages/publications/create-edit-publication/create-edit-publication.component';



// Material Module
import { MaterialModude } from './modules/material.module'

// Dependencies
import 'hammerjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

//Dialogs
import { ConfirmsDialog } from 'src/app/templates/confirm-dialog/confirm-dialog';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    TopbarComponent,
    ToplogoComponent,
    CreateEditUserComponent,
    ListPublicationComponent,
    LoginAdminComponent,
    CreateEditPublicationComponent,
    // Dialogs
    ConfirmsDialog,

    // Dependencies
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModude,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireDatabaseModule,     
  ],
  providers: [

  ],
  entryComponents: [
    ConfirmsDialog, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
