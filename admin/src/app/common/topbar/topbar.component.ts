import { Component, OnInit, OnDestroy } from '@angular/core';
import { VarsService } from "../../services/vars.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

    // Behavior Subjects Vars
    user: object;

    // Subscriptions
    userSubs: any;


    constructor(
        private vars: VarsService,
        private _router: Router
    ) { }


    ngOnInit() {
        this.userSubs = this.vars.user.subscribe(data=> this.user = data);
    }

    ngOnDestroy(){
        this.userSubs.unsubscribe();
    }

    changeLang(val) {
      localStorage.setItem('MA-lang', val);
    }


    logout(){
        this.vars.setUser(null);
        this._router.navigate(['/']);
    }

}
