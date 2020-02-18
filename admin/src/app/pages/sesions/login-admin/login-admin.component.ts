import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import { VarsService } from "../../../services/vars.service";
import { Router } from '@angular/router';

@Component({
   selector: "app-login-admin",
   templateUrl: "./login-admin.component.html",
   styleUrls: ["./login-admin.component.scss"],
})


export class LoginAdminComponent implements OnInit {
   // Behavior Subjects Vars
   user: object;
   // Subscriptions
   userSubs: any;
   
   // Forms
   loginForm: FormGroup;
   
   // Vars
   error: string;
   email: string;
   password: string;
   loading = false;

   
   constructor(
   public api: ApiService,
   private vars: VarsService,
   private _formBuilder: FormBuilder,
   private _router: Router 
   ) { }
   
   
   ngOnInit() {
      this.loginForm = this._formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         pass: ['',Validators.required],
      });
   }
   
   login() {

      let params = 'email=' + this.loginForm.value['email'];
      params += '&pass=' + this.loginForm.value['pass'];
      console.log(params)
      this.api.loginUser(params).subscribe(response =>{	   
         if(response['status'] == '200'){
            this.vars.setUser(response['user']);
         } else {
            this.error = "Email o contraseña incorrecta.";
         }
         this.loading = false;
      });
   }

   registrar() {
      this.vars.setUser(this.loginForm.value);
      this._router.navigate(['/usuario'])

   }
   
}
