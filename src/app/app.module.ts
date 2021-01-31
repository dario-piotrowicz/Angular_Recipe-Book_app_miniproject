import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';

import { AuthModule } from './auth/auth.module';
import { RecipesPanelModule } from './recipes-panel/recipes-panel.module';
import { ShoppingListPanelModule } from './shopping-list-panel/shopping-list-panel.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';

const featureModules = [
  AuthModule,
  RecipesPanelModule,
  ShoppingListPanelModule,
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, DropdownDirective],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    ...featureModules,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
