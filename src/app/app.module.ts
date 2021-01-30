import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { RecipesPanelModule } from './recipes-panel/recipes-panel.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppigListPanelComponent } from './shoppig-list-panel/shoppig-list-panel.component';
import { ShoppingListEditorComponent } from './shoppig-list-panel/shopping-list-editor/shopping-list-editor.component';
import { ShoppingListComponent } from './shoppig-list-panel/shopping-list/shopping-list.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppigListPanelComponent,
    ShoppingListEditorComponent,
    ShoppingListComponent,
    DropdownDirective,
    AuthPageComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesPanelModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
