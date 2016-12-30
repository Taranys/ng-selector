import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: 'ng-selectize[required][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => NgSelectorValidator), multi: true }]
})
export class NgSelectorValidator implements Validator {
    private isEmpty(value: any) {
        if (value === null || value === undefined) {
            return true;
        }
        if (value.length && value.length > 0) {
            return false;
        }
        return true;
    }

    validate(c: AbstractControl): { [p: string]: any } {
        return this.isEmpty(c.value) ? { required: { valid: false } } : null;
    }
}