import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin: boolean = true;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onLogin(){
    this.authService.login();

    this.loadingCtrl.create({
      keyboardClose: true,
      message: "Logging in ..."
    })
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl("/places/discover");
      }, 2000);
    })
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if(this.isLogin){
      //Login
    } else {
      //Signup
      this.authService.signup(email, password).subscribe(response => {

      },
      error => {

      });
    }
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }
}
