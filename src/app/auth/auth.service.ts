import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  payload$$!: BehaviorSubject<ILoginPayload | null>;

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.initLoginPayload();
  }

  whenLoggedIn(): Observable<boolean> {
    return this.payload$$.pipe(
      map(this.verify.bind(this)),
    );
  }

  whenSubmit(payload$: Observable<ILoginPayload>) {
    payload$.subscribe(this.payload$$);
    this.payload$$.subscribe((payload) => {
      if (this.verify(payload)) {
        this.login(<ILoginPayload>payload);
      } else {
        this.logout();
      }
    });
  }

  private logout() {
    this.localStorageService.remove(AuthService.localStorageAuthKey);
    this.router.navigate(['auth']);
  }

  private login(payload: ILoginPayload) {
    this.localStorageService.set(payload, AuthService.localStorageAuthKey);
    this.router.navigate(['']);
  }

  private initLoginPayload() {
    this.payload$$ =
      new BehaviorSubject<ILoginPayload | null>(this.localStorageService.get(AuthService.localStorageAuthKey));
  }

  private verify(payload: ILoginPayload | null) {
    return Object.entries(verificationLoginPayload)
      .every(([key, value]) => (
        payload && payload[<keyof ILoginPayload>key] === value
      ));
  }
}
