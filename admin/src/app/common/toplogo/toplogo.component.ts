import { Component, OnInit } from '@angular/core';
import { VarsService } from '../../services/vars.service'

@Component({
   selector: 'app-toplogo',
   templateUrl: './toplogo.component.html',
   styleUrls: ['./toplogo.component.scss']
})
export class ToplogoComponent implements OnInit {

   // Behavior Subjects Vars
   menuMobile: boolean;

   // Subscriptions
   menuMobileSubs: any;


   constructor(private vars: VarsService) { }


   ngOnInit() {
      this.menuMobileSubs = this.vars.menuMobile.subscribe(data => this.menuMobile = data);
      //this.vars.setSidebar(false);
   }

   ngOnDestroy() {
      this.menuMobileSubs.unsubscribe();
   }

   openMenu() {
      this.vars.setMenuMobile()
   }

}
