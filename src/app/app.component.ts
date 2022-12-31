import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@capacitor/app';
import { Plugins } from '@capacitor/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl("/auth");
  }

  ngOnInit(): void {
    Plugins.App.addListener('appStateChange', this.checkAuthOnResume.bind(this));
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  private checkAuthOnResume(state: AppState) {
    if (state.isActive) {
      this.authService
        .autoLogin()
        .pipe(take(1))
        .subscribe(success => {
          if (!success) {
            this.onLogout();
          }
        });
    }
  }
}
