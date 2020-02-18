import { Component, OnInit } from '@angular/core';
import { VarsService } from 'src/app/services/vars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-create-edit-publication',
	templateUrl: './create-edit-publication.component.html',
	styleUrls: ['./create-edit-publication.component.scss']
})
export class CreateEditPublicationComponent implements OnInit {
	
	// Behavior Subjects Vars
	user: object;
	// Forms
	form: FormGroup;
	// Vars
	error: string;
	loading: boolean = false;
	load: boolean = false;
	currentIdPublic: number;

	filesUrl = this.vars.filesUrl;
		
	
	constructor(
		private vars: VarsService,
		public api: ApiService,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _snackBar: MatSnackBar,
		private _route: ActivatedRoute
		) { }
		

		ngOnInit() {
			
			this.user = this.vars.user.source['value'];
			this.currentIdPublic = this._route.snapshot.params.id;
			
			this.form = this._formBuilder.group({
				idPublicacion: [''],
				descripcion: ['', [Validators.required, Validators.maxLength(120)]],
				imagen: [''],
				image: [''],
			});
			
			if(this.currentIdPublic){
				this.load = true;
				let params = 'idPublicacion=' + this.currentIdPublic;
				this.api.viewPublic(params).subscribe(response => {       
					if(response['status'] == '200'){
						this.form.patchValue(response['user']);
						console.log(response['user']);
					} else {
						this._snackBar.open('Publicación no encontrada', 'Entendido', {duration: 5000});
						this._router.navigate(['/'])
					}
					this.load = false;
				});
			}			
		}


		onFileChange(ev){
			if(ev.target.files[0]){
				var reader = new FileReader();
				reader.readAsDataURL(ev.target.files[0]);
				reader.onload = (e) => {
					this.form.controls.image.setValue(reader.result);
				}
			}
		}
		

		creatEdit() {
			
			this.error = "";
			this.loading = true;
			var nro: number = 0;
			let params = 'imagen=' + this.form.value['image'];
			params += '&descripcion=' + this.form.value['descripcion'];
			params += '&idUsuario=' + this.user['idUsuario'];
			
			if(this.currentIdPublic){
				params += '&idPublicacion=' + this.currentIdPublic;
				this.api.editPublic(params).subscribe(response => {        
					if(response['status'] == '200'){
						this._snackBar.open('Publicacíon editada', 'Entendido', {duration: 5000});
						this._router.navigate(['/'])
					} else {
						this.error = "La Publicacíon no pudo ser editada.";
					}
					this.loading = false;
				});

				
			}else{
				params += '&destacado=' + nro;
				console.log(nro)
				this.api.newPublic(params).subscribe(response => {       
					if(response['status'] == '200'){
						this._snackBar.open('Publicacíon creada', 'Entendido', {duration: 5000});
						this._router.navigate(['/'])
					} else {
						this.error = "La Publicacíon no pudo ser creada.";
					}
					this.loading = false;
				});
			}
		}

		
		
	}
	