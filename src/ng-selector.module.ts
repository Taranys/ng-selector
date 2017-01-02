import { NgModule } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { NgSelectorComponent } from './ng-selector.component';
import { NgSelectorValidator } from './ng-selector.validator';

@NgModule({
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
