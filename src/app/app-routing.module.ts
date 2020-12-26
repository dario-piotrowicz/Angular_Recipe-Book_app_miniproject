import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesPanelComponent } from './recipes-panel/recipes-panel.component';
import { ShoppigListPanelComponent } from './shoppig-list-panel/shoppig-list-panel.component';


const appRoutes: Routes = [
    {
        path: '', redirectTo: '/recipes', pathMatch: 'full'
    },
    {
        path: 'recipes', component: RecipesPanelComponent
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