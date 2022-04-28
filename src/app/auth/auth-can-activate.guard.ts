import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthCanActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.whenLoggedIn()
      .pipe(
        tap((allowed) => {
          if (!allowed) {
            this.router.navigate(['auth']);
          }
        })
      );
  }
}
