import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthSignInResponse,
  AuthSignUpResponse,
} from '../../models/auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  public loading: Observable<boolean>;
  public errorMessage: Observable<string>;
  private authenticatedUserSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loading = this.authService.isLoading;
    this.errorMessage = this.authService.errorMessage;
    this.authenticatedUserSubscription = this.authService.authenticatedUser
      .pipe(filter((user) => !!user))
      .subscribe(() => this.router.navigate(['/recipes']));
  }

  ngOnDestroy(): void {
    this.authenticatedUserSubscription.unsubscribe();
  }

  onSubmitHandler(submitterName: string, form: NgForm) {
    if (form.invalid) return;

    const { email, password } = form.value;
    form.reset();
    if (submitterName === 'sign-in') {
      this.handleSignIn(email, password);
    } else {
      this.handleSignUp(email, password);
    }
  }

  private handleSignIn(email: string, password: string): void {
    this.authService.signIn(email, password);
  }

  private handleSignUp(email: string, password: string): void {
    const requestObs = this.authService.signUp(email, password);
    this.handleSignInOrSignUpServiceRequest(requestObs);
  }

  private handleSignInOrSignUpServiceRequest(
    requestObs: Observable<AuthSignUpResponse | AuthSignInResponse>
  ): void {
    requestObs.subscribe(
      () => {
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => (this.errorMessage = errorMessage)
    );
  }
}
