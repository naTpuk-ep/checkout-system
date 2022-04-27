import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../auth/auth.service';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('exitBtn') exitBtn!: ElementRef<HTMLButtonElement>;

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(this.exitBtn.nativeElement, 'click')
      .pipe(
        map(() => null),
      )
      .subscribe(this.authService.payload$$);
  }
}
