import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from "@ionic/storage";

@Injectable({
   providedIn: 'root'
})

export class VarsService {

   // Global Urls 
   public dbUrl = "http://localhost:3235/api/";
   public filesUrl = "http://localhost:3235/uploads/";

   
   // Behavior Subjects Vars
   private userBS = new BehaviorSubject<object>(null);
   user = this.userBS.asObservable();
   currentUser: object = {};

   private sidebarBS = new BehaviorSubject<boolean>(true);
   sidebar = this.sidebarBS.asObservable();

   private menuMobileBS = new BehaviorSubject<boolean>(false);
   menuMobile = this.menuMobileBS.asObservable();

   constructor(
      private storage: Storage
   ) {}

   setUser(data) {
      this.userBS.next(data);
      (data) ?  this.storage.set("CL_user", data) :  this.storage.set("CL_user", null);
      this.currentUser = data;
   }

   setSidebar(data) {
      this.sidebarBS.next(!data);
   }

   setMenuMobile(data?) {
      if (data != null){
         this.menuMobileBS.next(data);
      } else {
         this.menuMobileBS.next(!this.menuMobile.source['value']);
      }
   }

}
