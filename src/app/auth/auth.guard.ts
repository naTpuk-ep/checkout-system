import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthorize = this.authService.isAuthorize;
    if (!isAuthorize) {
      this.router.navigate(['auth']);
    }
    return isAuthorize;
  }

}
