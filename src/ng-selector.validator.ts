import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: 'ng-selector[required][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useClass: NgSelectorValidator, multi: true }]
})
export class NgSelectorValidator implements Validator {
    private isEmpty(value: any) {
        if (value === null || value === undefined) {
            return true;
        }
        // empty array
        if (Array.isArray(value) && value.length > 0) {
            return false;
        }
        // all objects are valids
        if (!Array.isArray(value) && typeof value === 'object') {
          return false;
        }
        return true;
    }

    validate(c: AbstractControl): { [p: string]: any } {
        return this.isEmpty(c.value) ? { required: { valid: false } } : null;
    }
}
