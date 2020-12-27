# Basic (likely less-known) Angular Interesting Facts

I have worked with Angular for around a year, had done the famous [Tours of Heroes Tutorial](https://angular.io/tutorial) a couple of times, read documentation and read articles but there were some rather basic facts which I was unaware of (or simply forgot them) and which I learned in the [Angular - The Complete Guide (2021 Edition) by Maximilian Schwarzmüller](https://www.udemy.com/course/the-complete-guide-to-angular-2/) course, I've found them interesting and worth being rememered so I decided to document them here.
\
\
This is by no means a comprehensive or necessary list of facts, it's just a list of facts which I personally found interesting, rather basic but less known than others.
\
\
\
&NewLine;

- ## How Angular Bootstraps the app

  This is something I always took for granted (whilst in other frameworks such as React of Vue is much more explicit) but Angular somehow needs to do something to start or better bootstrap out application.

  This is simply done by the `main.ts` file in the following way:

  ```ts
  platformBrowserDynamic().bootstrapModule(AppModule);
  ```

  In Turn the `AppModule` needs to specify what component to bootstrap:

  ```ts
  bootstrap: [AppComponent];
  ```

  Where `AppComponent` is the root component that we want to inject into the `index.html`'s `app-root` element.

  This enables us to inject our application in the DOM.

  _Note: I don't think this fact is to be always keept in mind, nor it can often be useful while writing an Angular app, it is nonetheless something interesting which helps us understand how the application basically gets instantiated._

- ## The \*ngIf's else

  For opposite conditions in templates I've always used (and saw the same done by others) the `ngIf` directive in the following way:

  ```html
  <p *ngIf="condition">The condition is true</p>
  <p *ngIf="!condition">The condition isn't true</p>
  ```

  This works fine but I always found it less than ideal since we do repeat the condition more than once and that could lead to more cluttered and less maintainable code, I was hoping there could be an else condition (like Vue's `v-else`).

  It turns out that such condition was available all along (although clunkier than Vue's `v-else`) as:

  ```html
  <p *ngIf="condition; else elseIsTrue">The condition is true</p>
  <ng-template #elseIsTrue>
    <p>The condition isn't true</p>
  </ng-template>
  ```

  Although I find this implementation a bit ackward, I do find it quite nice as it does indeed allow us not to have to repeat our condition multiple times.
