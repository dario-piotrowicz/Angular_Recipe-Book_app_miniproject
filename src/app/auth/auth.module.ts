import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageComponent } from './auth-page/auth-page.component';

<<<<<<< HEAD
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthPageComponent, LoadingSpinnerComponent],
  imports: [CommonModule, FormsModule],
=======
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [CommonModule, FormsModule, SharedModule, AuthRoutingModule],
>>>>>>> c5b4032... fixed auth routing module
  exports: [AuthPageComponent],
})
export class AuthModule {}
