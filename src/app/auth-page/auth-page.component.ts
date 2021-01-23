import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import {
  AuthSignInResponse,
  AuthSignUpResponse,
} from '../models/auth-response.model';

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
    form.reset();
    if (submitterName === 'sign-in') {
      this.handleSignIn(email, password);
    } else {
      this.handleSignUp(email, password);
    }
  }

  private handleSignIn(email: string, password: string): void {
    const requestObs = this.authService.signIn(email, password);
    this.handleSignInOrSignUpServiceRequest(requestObs);
  }

  private handleSignUp(email: string, password: string): void {
    const requestObs = this.authService.signUp(email, password);
    this.handleSignInOrSignUpServiceRequest(requestObs);
  }

  private handleSignInOrSignUpServiceRequest(
    requestObs: Observable<AuthSignUpResponse | AuthSignInResponse>
  ): void {
    requestObs.pipe(finalize(() => (this.loading = false))).subscribe(
      (response) => {
        console.log({ response });
      },
      (errorMessage) => {
        this.errorMessage = errorMessage;
      }
    );
  }
}
