import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
  public loading = false;
  public errorMessage: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmitHandler(submitterName: string, form: NgForm) {
    if (form.invalid) return;

    this.loading = true;
    const { email, password } = form.value;
    if (submitterName === 'sign-in') {
      this.handleSignIn(form);
    } else {
      this.handleSignUp(email, password);
    }
    form.reset();
  }

  private handleSignIn(form: NgForm) {
    console.log('sign in!', { form });
  }

  private handleSignUp(email: string, password: string): void {
    this.authService
      .signUp(email, password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (response) => {
          console.log({ response });
        },
        (errorMessage) => {
          this.errorMessage = errorMessage;
        }
      );
  }
}
