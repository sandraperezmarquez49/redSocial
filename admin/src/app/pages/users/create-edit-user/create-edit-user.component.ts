import { Component, OnInit } from '@angular/core';
import { VarsService } from 'src/app/services/vars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-create-edit-user',
	templateUrl: './create-edit-user.component.html',
	styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {
	
	// Behavior Subjects Vars
	user: object = this.vars.user.source['value'];
	// Forms
	form: FormGroup;
	
	// Vars
	error: string;
	currentIdUser: number;
	datosUser: any;
	loading: boolean = false;
	procesoFin: boolean = false;
	load: boolean = false;
	
	filesUrl = this.vars.filesUrl;

	sexos: object[] = [
		{id:1, name:"Femenino"},
		{id:2, name:"Masculino"},
		{id:3, name:"No definido"},
	]
	
	constructor(
		private vars: VarsService,
		public api: ApiService,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _snackBar: MatSnackBar,
		private _route: ActivatedRoute
		) { }
		
		ngOnInit() {
			if(this.user){
				console.log(this.user)
				this.load = true;
				let params = 'email=' + this.user['email'];
				this.api.viewUser(params).subscribe(response =>{	   
					if(response['status'] == '200'){
						this.form.controls.pass.setValidators(null);
						this.form.controls.email.disable();	
						this.form.patchValue(response['user']);
						this.datosUser=response['user'];
						this.currentIdUser = this.datosUser['idUsuario'];
					
						this.form.controls.pass.setValue(null);
					} else {
						this.error = "Usuario no encontrado.";
					}
					this.loading = false;
					this.load = false;
				});
			} else {
				console.log('epa')
			}

			this.form = this._formBuilder.group({
				idUsuario: [''],
				pass: [''],
				apellido: ['', [Validators.required, Validators.maxLength(30)]],
				nombre: ['', [Validators.required,Validators.maxLength(30)]],
				sexo: ['', [Validators.required]],
				fechaNacimiento: ['', [Validators.required]],
				email: ['', [Validators.required, Validators.email,Validators.maxLength(80)]],
				telefono: ['', [Validators.required, Validators.maxLength(50)]],
			});
			
				
		}
		creatEdit(){
			
			this.error = "";
			this.loading = true;
			let d = new Date(this.form.value['fechaNacimiento']);
			console.log('d', d);
			var fecha= d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
			
			

			let params = 'email=' + this.user['email'];
				params += '&nombre=' + this.form.value['nombre'];
				params += '&apellido=' + this.form.value['apellido'];
				params += '&pass=' + this.form.value['pass'];
				params += '&sexo=' + this.form.value['sexo'];
				params += '&fechaNacimiento=' + fecha;
				params += '&telefono=' + this.form.value['telefono'];

				if(this.user){
					params += '&idUsuario=' + this.currentIdUser;
					console.log(params)
					this.api.editUser(params).subscribe(response =>{	   
						if(response['status'] == '200'){
							this._snackBar.open('Usuario editado', 'Entendido', {duration: 5000});
							this.procesoFin = true;
						} else {
							this.error = "El usuario no pudo ser editado.";
						}
						this.loading = false;
					});
				}else{
					this.api.newUser(params).subscribe(response =>{
						if(response['status'] == '200'){
							this._snackBar.open('Usuario creado', 'Entendido', {duration: 5000});
							this.procesoFin = true;
						} else {
							this.error = "El usuario no pudo ser creado.";
						}
						this.loading = false;
					});
				}
				
		}

}
	
	
	