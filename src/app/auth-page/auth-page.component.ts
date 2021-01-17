import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmitHandler(submitterName: string, form: NgForm) {
    if (submitterName === 'sign-in') {
      this.handleSignIn(form);
    } else {
      this.handleSignUp(form);
    }
    form.reset();
  }

  private handleSignIn(form: NgForm) {
    console.log('sign in!', { form });
  }
  private handleSignUp(form: NgForm) {
    console.log('sign up!', { form });
  }
}
