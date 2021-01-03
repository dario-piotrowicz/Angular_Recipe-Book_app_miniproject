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

- ## The @Input and @Output argument

  The `@Input()` and `@Output()` decorators used in components, or more in genaral in directives, can take a string argument which will generate an alias for the property/emitter which can be referenced by outside elements.

  Often we see this specified for custom directives in which you can give to an input property an alias with the same name of the directive itself, so that the directive and the property binding can be expressed more concisely as `[customDirective]="value"`.

  I never thought much of it but when I was reminded of this functionality I thought that it could actually be useful sometimes, for example if a project have some strict naming conventions and you end up needing a property's named to be different between the internal class implementation and the outside's binding.

  Altough I don't think this is a very frequent feature to use, I do think that it could be beneficial and generate some clean/clever code if used in the right way. So I think it's still worth remembering so that we do have this additional small tool ready in our toolbox.

- ## Using setters/getters for input bound properties

  For input bound properties we can apply setters and getters methods, there are many different ways to use this feature, one for example is the following:

  ```ts
  private _property: any;

  get property(): any {
    return this._property;
  }

  @Input() set property(value: any) {
    // ... additional code can go here
    this._property = value; // you can even process/check the value here
    // ... additional code can go here
  }
  ```

  I was not aware of this and would handle the data in a different way, like processing it using `ngOnChanges` or similar solutions. But using setters/getters in such a way seems to me like a much more elegant and efficient solution, which allows us to process the data as soon as it is bound to the component/directive in a clean and direct way, side effect code related to the value can also additionaly be applied (this can help avoid unnecessary subscriptions/checks).

- ## ViewEncapsulation

  When you write components in Angular one thing that is a well know fact and which is actually a very nice feature of the framework is the fact that the css applied to a component doesn't effect the other components in the same applicaton, not even if the css styles some basic element such as `h1` or `p`.

  Angular does that by adding to taking the component, applying to each of its html elements a specific and unique attribute and extending the css selectors to use that attribute. In this way the framework manages to isolate the css of each component.

  What may be less known is that this is just the default behaviour, and there are two other options, this behaviour can be modified on the component level by specifying an option the @Component decorator as follows:

  ```ts
    @Component({
    ...,
    encapsulation: ViewEncapsulation.X
    })
    class MyComponent {}
  ```

  where `X` is either `Emulated` (the default), `None` or `ShadowDom`, in details:

  - `Emulated` simply implements the default behaviour of adding the extra attribute to the elements and the css
  - `None` turns off the behaviour, reverting to the standard css behaviour in which css files are all merged into one and rules can override each other (this is undesirable, expecially considering the fact that we cannot clearly know in which order the css files are bundled, but there can indeed be instances in which this may come in handy)
  - `ShadowDom` implements the behaviour by using the browser's Shadow Dom which is an advanced feature which basically allows to implement the css isolation in a more web-standard / browser-native manner. This feature (as of yet) is however not widely supported by browsers and thus should be used with caution possibly alongside a polyfill libary.

- ## providedIn

  When you create a new service using the Angular CLI by default the following decoration gets applied to the newly created class:

  ```ts
    @Injectable({
      providedIn: 'root'
    })
  ```

  What I used to do was to keep the `providedIn` option only if the service needs to be in the root module, otherwise I would remove it and add the newly created service to the providers option of the module it was supposed to be provided in.

  It turns out however that the `providedIn`'s argument can also be any module in your application, and you can simply specify that as follows:

  ```ts
  import { AnythingModule } from '.../anything.module';

  @Injectable({
    providedIn: AnythingModule
  })
  ```

  Not only this is a viable alternative but it's actually the recommended way to provide services in modules, as this allows Angular to tree-shake the services not actually used in the application/module (you can read more about it [here](https://angular.io/guide/hierarchical-dependency-injection#tree-shaking-and-injectable)).

  Additionally, a new value you can assign to the `providedIn` field **since Angular 9** is the `'any'` string, this basically creates a shared singleton instance of the service for all eagerly loaded modules and unique instances for eahc lazy loaded one (you can read more about it [ here](https://angular.io/guide/providers#limiting-provider-scope-by-lazy-loading-modules)).
