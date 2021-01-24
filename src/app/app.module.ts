import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesPanelComponent } from './recipes-panel/recipes-panel.component';
import { RecipesListComponent } from './recipes-panel/recipes-list/recipes-list.component';
import { RecipeDetailsComponent } from './recipes-panel/recipe-details/recipe-details.component';
import { RecipesListItemComponent } from './recipes-panel/recipes-list/recipes-list-item/recipes-list-item.component';
import { ShoppigListPanelComponent } from './shoppig-list-panel/shoppig-list-panel.component';
import { ShoppingListEditorComponent } from './shoppig-list-panel/shopping-list-editor/shopping-list-editor.component';
import { ShoppingListComponent } from './shoppig-list-panel/shopping-list/shopping-list.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { NoRecipeDetailsComponent } from './recipes-panel/no-recipe-details/no-recipe-details.component';
import { RecipeEditorComponent } from './recipes-panel/recipe-editor/recipe-editor.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesPanelComponent,
    RecipesListComponent,
    RecipeDetailsComponent,
    NoRecipeDetailsComponent,
    RecipesListItemComponent,
    ShoppigListPanelComponent,
    ShoppingListEditorComponent,
    ShoppingListComponent,
    DropdownDirective,
    RecipeEditorComponent,
    AuthPageComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
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
