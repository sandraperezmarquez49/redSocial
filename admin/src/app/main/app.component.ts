import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationStart } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { VarsService } from 'src/app/services/vars.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
// Behavior Subjects Vars
user: object;
sidebar: boolean;
menuMobile: boolean;

// Subscriptions
userSubs: any;
sidebarSubs: any;
menuMobileSubs: any;

// Vars
title = 'Censo casa sobre la roca';
loading: boolean = true;

constructor(
	private storage: Storage,
	private vars: VarsService,
	private apiService: ApiService,
	private _router: Router
) {}

ngOnInit() {
	this.userSubs = this.vars.user.subscribe(data => this.user = data);
	this.sidebarSubs = this.vars.sidebar.subscribe(data => this.sidebar = data);
	this.menuMobileSubs = this.vars.menuMobile.subscribe(data => this.menuMobile = data);


	// Get Users
	this.storage.get('CL_user').then((val) => {
		if (val) {
			this.vars.setUser(val);
		}
		this.loading = false;
	});
}

ngOnDestroy() {
	this.userSubs.unsubscribe();
	this.sidebarSubs.unsubscribe();
	this.menuMobileSubs.unsubscribe();
}
}
