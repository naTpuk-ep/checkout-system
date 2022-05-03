import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class AuthComponentCanActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.whenLoggedIn()
      .pipe(
        tap((allowed) => {
          if (allowed) {
            this.router.navigate(['']);
          }
        }),
        map(allowed => !allowed),
      );
  }

}
