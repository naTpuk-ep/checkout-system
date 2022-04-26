import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, ILoginPayload } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  fb = new FormBuilder();
  formGroup!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.whenSubmit();
  }

  private whenSubmit() {
    this.authService.whenSubmit(this.formGroup.valueChanges);
  }

  private initFormGroup() {
    this.formGroup = this.fb.group(<{ [p in keyof ILoginPayload]: any }>{
      email: [
        '',
        [Validators.required],
      ],
      pass: [
        '',
        Validators.required,
      ],
    }, {
      updateOn: 'submit',
    });
  }

}
