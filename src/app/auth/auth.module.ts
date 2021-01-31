import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthPageComponent } from './auth-page/auth-page.component';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [CommonModule, FormsModule, SharedModule, AuthRoutingModule],
  exports: [AuthPageComponent],
})
export class AuthModule {}
