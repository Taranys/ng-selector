import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { NgSelectorComponent } from './ng-selector.component';

const simpleValues = [
  { id: 1, label: '1' },
  { id: 2, label: '2' },
  { id: 3, label: '3' },
  { id: 4, label: '4' },
  { id: 5, label: '5' },
];

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('Component: Selector', () => {
  let fixture: ComponentFixture<NgSelectorComponent>;
  let comp: NgSelectorComponent;
  let de: DebugElement;
  let el: HTMLElement;

  const options = () => el.querySelector('.selectize-dropdown-content').children;
  const selected = () => el.querySelectorAll('.item');
  const placeholder = () => el.querySelector('input').attributes.getNamedItem('placeholder').value;

  const setOptions = (values) => { comp.options = values; fixture.detectChanges(); };
  const selectOption = (pos) => { (options().item(pos) as HTMLElement).click(); fixture.detectChanges(); };
  const search = (searchInput) => el.querySelector('input').textContent = searchInput;

  beforeEach(async(() => {
    fixture = TestBed
      .configureTestingModule({ declarations: [NgSelectorComponent] })
      .createComponent(NgSelectorComponent);

    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = fixture.nativeElement;
  }));

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should define 5 options', () => {
    setOptions(simpleValues);
    expect(options().length).toBe(simpleValues.length);
  });

  it('should define define and change available options', () => {
    setOptions(simpleValues);
    expect(options().length).toBe(simpleValues.length);

    const changedValues = simpleValues.filter(v => v.id > 3);
    setOptions(changedValues);
    expect(options().length).toBe(changedValues.length);
  });

  it('should change value when an option is selected', () => {
    comp['multiple'] = true;
    setOptions(simpleValues);
    selectOption(2);
    expect(selected().item(0).textContent).toEqual(simpleValues[2].label);
  });

  it('should be able to select a default value', () => {
    fixture.detectChanges();

    comp.writeValue(simpleValues[1]);

    expect(selected().length).toBe(1)
    expect(selected().item(0).textContent).toBe(simpleValues[1].label);
  });

  it('should be able to select default values', () => {
    comp['multiple'] = true;
    fixture.detectChanges();

    comp.writeValue(simpleValues);

    expect(selected().length).toBe(simpleValues.length);
    expect(selected().item(0).textContent).toBe(simpleValues[0].label);
  });

  it('should return an array of values if multiple is enabled', () => {
    comp['multiple'] = true;
    setOptions(simpleValues);

    selectOption(4);
    selectOption(0);

    expect(selected().length).toEqual(2);
    expect(selected().item(0).textContent).toEqual(simpleValues[4].label);
    expect(selected().item(1).textContent).toEqual(simpleValues[0].label);
  });

  it('should define a placeholder if required', () => {
    const ph = 'Unit test placeholder';
    comp['placeholder'] = ph;
    fixture.detectChanges();
    expect(placeholder()).toBe(ph);
  });

  it('should support [readonly] property', () => {
    setOptions(simpleValues);
    expect(el.querySelector('.selectize-input.disabled')).toBeFalsy();

    comp.readonly = true;
    fixture.detectChanges();

    expect(el.querySelector('.selectize-input.disabled')).toBeTruthy();
    expect(selected().length).toEqual(0);
  });

  it('should support async option loading', (done) => {
    comp.loadValues.subscribe(({query, result}) => result([1, 2, 3].map(val => ({ id: val, label: `${query}_${val}` }))));
    fixture.detectChanges();

    el.querySelector('input').value = 'paris';
    el.querySelector('input').dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    comp.selectize.on('load', () => {
      expect(options().length).toBe(3);
      expect(options().item(0).textContent).toBe('paris_1');
      done();
    });

  });

  it('should support updating option when selected data changes', () => {
    comp['multiple'] = true;
    fixture.detectChanges();

    setOptions(simpleValues);

    expect(options().length).toBe(5);
    expect(options().item(0).textContent).toBe('1');

    selectOption(0);

    expect(selected().item(0).textContent).toBe('1');

    const notSoSimpleValues = [
      { id: 1, label: '1 updated' },
      { id: 2, label: '2' }
    ];

    comp.writeValue(notSoSimpleValues);
    fixture.detectChanges();

    expect(options().length).toBe(3);
    expect(selected().item(0).textContent).toBe('1 updated');
  });

  xit('should manage custom rendering', () => { });
  xit('should support custom id field', () => { });
  xit('should support custom name field', () => { });
  xit('should allow creation of new component', () => { });

  // xit('should support string array for options');

});
