import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoRecipeDetailsComponent } from './recipes-panel/no-recipe-details/no-recipe-details.component';
import { RecipeDetailsComponent } from './recipes-panel/recipe-details/recipe-details.component';

import { RecipesPanelComponent } from './recipes-panel/recipes-panel.component';
import { ShoppigListPanelComponent } from './shoppig-list-panel/shoppig-list-panel.component';


const appRoutes: Routes = [
    {
        path: '', redirectTo: '/recipes', pathMatch: 'full'
    },
    {
        path: 'recipes', component: RecipesPanelComponent,
        children: [
            {
                path: '', component: NoRecipeDetailsComponent
            },
            {
                path: ':id', component: RecipeDetailsComponent
            }
        ]
    },
    {
        path: 'shopping-list', component: ShoppigListPanelComponent
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {};