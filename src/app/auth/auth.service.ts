import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../layout/services/local-storage.service';


export interface ILoginPayload {
  email: string;
  pass: string;
}

const verificationLoginPayload: ILoginPayload = {
  email: 'Zen@sayollo.com',
  pass: '123456',
};

@Injectable()
export class AuthService {

  private static localStorageAuthKey = 'auth';

  payload$!: Observable<ILoginPayload | null>;


  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.initLoginPayload();
  }

  whenLoggedIn(): Observable<boolean> {
    return this.payload$.pipe(
      map(this.verify.bind(this)),
    );
  }

  whenSubmit(payload$: Observable<ILoginPayload>) {
    this.payload$ = payload$.pipe(
      shareReplay(),
    );
    this.payload$.subscribe((payload) => {
      if (this.verify(payload)) {
        this.login(<ILoginPayload>payload);
      }
    });
  }

  login(payload: ILoginPayload) {
    this.localStorageService.set(payload, AuthService.localStorageAuthKey)
    this.router.navigate(['']);
  }

  private initLoginPayload() {
    this.payload$ = of(this.localStorageService.get(AuthService.localStorageAuthKey));
  }

  private verify(payload: ILoginPayload | null) {
    return Object.entries(verificationLoginPayload)
      .every(([key, value]) => (
        payload && payload[<keyof ILoginPayload>key] === value
      ));
  }
}
