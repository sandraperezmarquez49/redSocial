import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VarsService } from 'src/app/services/vars.service'

@Injectable({
	providedIn: 'root'
 })
 
export class ApiService {
	constructor(
		private http: HttpClient,
		private vars: VarsService
		) { }

	dbUrl = this.vars.dbUrl;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/x-www-form-urlencoded'
		})
	};

	getInfoUser() {
		return this.http.get(
			'https://ipapi.co/json/'
		)
	};


	viewUser(json) {
		return this.http.post(
			this.dbUrl + 'users/viewUser',
			json,
			this.httpOptions
		)
	};

	editUser(json) {
		return this.http.post(
			this.dbUrl + 'users/edit',
			json,
			this.httpOptions
		)
	};

	newUser(json) {
		return this.http.post(
			this.dbUrl + 'users/register',
			json,
			this.httpOptions
		)
	};

	loginUser(json) {
		return this.http.post(
			this.dbUrl + 'users/login',
			json,
			this.httpOptions
		)
	};

	deleteUser(json) {
		return this.http.post(
			this.dbUrl + 'users/delete',
			json,
			this.httpOptions
		)
	};

	//Publications
	listPublic(json) {
		return this.http.post(
			this.dbUrl + 'publication/list',
			json,
			this.httpOptions
		)
	};

	deletePublic(json) {
		return this.http.post(
			this.dbUrl + 'publication/delete',
			json,
			this.httpOptions
		)
	};

	viewPublic(json) {
		return this.http.post(
			this.dbUrl + 'publication/view',
			json,
			this.httpOptions
		)
	};

	editPublic(json) {
		return this.http.post(
			this.dbUrl + 'publication/edit',
			json,
			this.httpOptions
		)
	};

	newPublic(json) {
		return this.http.post(
			this.dbUrl + 'publication/register',
			json,
			this.httpOptions
		)
	};
	
	
}
