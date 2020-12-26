import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesPanelComponent,
    RecipesListComponent,
    RecipeDetailsComponent,
    RecipesListItemComponent,
    ShoppigListPanelComponent,
    ShoppingListEditorComponent,
    ShoppingListComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
