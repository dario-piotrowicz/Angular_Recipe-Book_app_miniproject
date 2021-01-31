import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageComponent } from './auth-page/auth-page.component';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthPageComponent, LoadingSpinnerComponent],
  imports: [CommonModule, FormsModule],
  exports: [AuthPageComponent],
})
export class AuthModule {}
