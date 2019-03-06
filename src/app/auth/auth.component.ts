import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signinForm: FormGroup;
  messageError: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
      this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {

      const email = this.signinForm.get('email').value;
      console.log(email);
      const password = this.signinForm.get('password').value;

      this.authService.signInUser(email, password).then(
          () => {
              this.router.navigate(['/albums']);
          },
          (error) => {
              this.messageError = error;
          }
      );
  }
}
