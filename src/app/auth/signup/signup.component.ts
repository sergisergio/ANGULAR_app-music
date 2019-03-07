import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  messageError: string = null;

  constructor(private authS: AuthService,
              private router: Router
  ) {
    if (this.authS.authenticated())
      this.router.navigate(['/albums'], { queryParams: { message: 'Success' } });
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {

      console.log(form.value['email']);
      console.log(form.value['password']);
      this.authS.createNewUser(form.value['email'], form.value['password']).then(
      () => {

        this.router.navigate(['/albums'], { queryParams: { message: 'Success' } });
      }
    ).catch(
      error => {
        this.messageError = 'error Login or password '
      }
    );
  }

}
