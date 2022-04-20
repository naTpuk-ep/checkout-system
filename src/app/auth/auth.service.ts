import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorize!: boolean;
  constructor() {
    this.isAuthorize = true;
  }
}
