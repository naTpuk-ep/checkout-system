import { forwardRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreModule } from '../core.module';
import { AuthService } from '../../auth/auth.service';


export interface IProduct {
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: forwardRef(() => CoreModule)
})
export class CartService {
  productList$$ = new BehaviorSubject<IProduct[]>([]);
  constructor(private authService: AuthService) {
    this.authService.payload$$.subscribe(res => {
      this.productList$$.next([]);
    })
  }
}
