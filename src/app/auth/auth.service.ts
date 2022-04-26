import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface ILoginPayload {
  email: string;
  pass: string;
}

const verificationLoginPayload: ILoginPayload = {
  email: 'Zen@sayollo.com',
  pass: '123456',
}

@Injectable()
export class AuthService {

  storage: ILoginPayload = {
    email: 'Zen@sayollo.com',
    pass: '123456',
  };
  payload$$!: Observable<ILoginPayload | null>;

  constructor(public router: Router) {
    this.payload$$ = of(this.storage);
  }

  whenLoggedIn(): Observable<boolean> {
    return this.payload$$.pipe(
      map(this.verify.bind(this))
    )
  }

  whenSubmitted(payload$: Observable<ILoginPayload>) {
    this.payload$$ = payload$.pipe(
      shareReplay()
    );
    this.payload$$.subscribe((payload) => {
      if (this.verify(payload)) {
        this.login(<ILoginPayload>payload);
      }
    })
  }

  login(payload: ILoginPayload) {
    this.router.navigate(['']);
  }

  private verify(payload: ILoginPayload | null) {
    return Object.entries(verificationLoginPayload).every(([key, value]) => (
      payload && payload[<keyof ILoginPayload>key] === value
    ));
  }
}
