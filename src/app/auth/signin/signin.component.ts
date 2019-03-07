import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  messageError: string = null;

  constructor(private authS: AuthService,
              private router: Router
  ) {
    if (this.authS.authenticated())
      this.router.navigate(['/admin'], { queryParams: { message: 'Success' } });
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {

      this.authS.auth(form.value['email'], form.value['password']).then(
      () => {
        this.router.navigate(['/admin'], { queryParams: { message: 'Success' } });
      }
    ).catch(
      error => {
        this.messageError = 'error Login or password '
      }
    );
  }
}
