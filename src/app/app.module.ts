import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';

import { AuthModule } from './auth/auth.module';
import { RecipesPanelModule } from './recipes-panel/recipes-panel.module';
import { ShoppingListPanelModule } from './shopping-list-panel/shopping-list-panel.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

const featureModules = [
  AuthModule,
  RecipesPanelModule,
  ShoppingListPanelModule,
];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ...featureModules,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
