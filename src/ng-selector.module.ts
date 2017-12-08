import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgSelectorComponent } from './ng-selector.component';
import { NgSelectorValidator } from './ng-selector.validator';

@NgModule({
    imports: [
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
