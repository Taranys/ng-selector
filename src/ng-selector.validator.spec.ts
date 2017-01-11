import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NgSelectorValidator } from './ng-selector.validator';

const dummy = { id: 'test', label: 'value' };

describe('Validator: Selector', () => {
    let instance;

    beforeEach(() => instance = new NgSelectorValidator());
    
    it('should be false with undefined', () => validateValue(undefined));
    it('should be false with null', () => validateValue(null));
    it('should be false with empty object', () => validateValue({}));
    it('should be false with empty array', () => validateValue([]));

    it('should be true with dummy object', () => validateValue(dummy, true));
    it('should be true with dummy array', () => validateValue([dummy, dummy], true));

    function validateValue(value, shouldBeValid = false) {
        const result = shouldBeValid ? null : { required: { valid: false } };
        expect(instance.validate({ value })).toEqual(result);
    }

});
