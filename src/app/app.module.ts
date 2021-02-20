import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { shoppingListReducer } from './store/reducers/shopping-list.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { recipesReducer } from './store/reducers/recipes.reducer';
import { RecipesEffects } from './store/effects/recipes.effects';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer,
      auth: authReducer,
      recipes: recipesReducer,
    }),
    StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
