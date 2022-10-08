import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionCardComponent } from './action-card/action-card.component';
import { AppMaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [BrowserAnimationsModule, CommonModule, AppMaterialModule, FlexLayoutModule, ReactiveFormsModule],
  declarations: [ActionCardComponent],
  exports: [ActionCardComponent],
})
export class SharedModule {}
