import { forwardRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreModule } from '../core.module';


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
}
