import { NgModule } from '@angular/core';

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
