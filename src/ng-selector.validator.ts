import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: 'ng-selector[required][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useClass: NgSelectorValidator, multi: true }]
})
export class NgSelectorValidator implements Validator {
    validate (c: AbstractControl): { [p: string]: any } {
        return this.isEmpty(c.value) ? { required: { valid: false } } : null;
    }

    private isEmpty (value: any) {
        if (value === null || value === undefined) {
            return true;
        }
        // empty array
        if (Array.isArray(value) && value.length > 0) {
            return false;
        }
        // all objects are valids
        if (!Array.isArray(value) && typeof value === 'object' && Object.keys(value).length > 0) {
          return false;
        }
        return true;
    }
}
