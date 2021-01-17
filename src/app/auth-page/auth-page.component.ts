import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmitHandler(submitterName: string) {
    if (submitterName === 'sign-in') {
      this.handleSignIn();
    } else {
      this.handleSignUp();
    }
  }

  private handleSignIn() {
    console.log('sign in!');
  }
  private handleSignUp() {
    console.log('sign up!');
  }
}
