import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgSelectorComponent } from './ng-selector.component';
import { NgSelectorValidator } from './ng-selector.validator';

export * from './ng-selector.component';
export * from './ng-selector.validator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    NgSelectorComponent,
    NgSelectorValidator,
  ],
  exports: [
    NgSelectorComponent,
    NgSelectorValidator,
  ]
})
export class NgSelectorModule { }
