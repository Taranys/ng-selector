import {
  AfterViewInit,
  Attribute,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// rollup dirty fix : https://github.com/rollup/rollup/issues/1267
import * as jqueryProxy from 'jquery';
const jQuery: JQueryStatic = (<any> jqueryProxy).default || jqueryProxy

import 'selectize';

@Component({
  selector: 'ng-selector',
  template: `<select #selector></select>`,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgSelectorComponent), multi: true }]
})
export class NgSelectorComponent implements AfterViewInit, ControlValueAccessor {

  // select element
  @ViewChild('selector') selector: ElementRef;

  @Input() set readonly (disabled: boolean) {
    this._disabled = disabled;
    this.checkDisabled();
  };

  // array of data
  @Input() set options (values: Array<any>) {
    this.optionsChanged(values)
  };

  @Input() plugins = new Array<string>()

  // async input options (function which provide data)
  @Output() loadValues = new EventEmitter<{ query: string, result: (options: Array<any>) => void }>();
  // rendering method to change display of item and options
  @Output() renderer = new EventEmitter<{ val: any, html: (html: string) => void, type: string }>();

  private _disabled = false;

  // actual selectize component
  selectize: any;

  // keep data until tagsComponent is initialized
  private data: any;
  private tmpOptions: any;

  private _mutiple = false
  @Input('multiple')
  get multiple () { return this._mutiple; }
  set multiple (value) {
    this._mutiple = value;
    // this.selectize.maxItems = this.multiple ? null : 1,
    if (this.selectize) this.selectize.maxItems = this.checkMultipleFalsy();
  }

  constructor (@Attribute('placeholder') public placeholder = '',
               @Attribute('id-field') public idField = 'id',
               @Attribute('label-field') public labelField = 'label',
               @Attribute('allow-creation') public allowCreation = true) {}

  ngAfterViewInit (): any {
    // initialize with default values
    this.placeholder = this.placeholder || '';
    this.idField = this.idField || 'id';
    this.labelField = this.labelField || 'label';
    this.multiple = this.multiple === undefined ? false : this.multiple;
    this.allowCreation = this.allowCreation === undefined ? true : this.allowCreation;

    let render;
    if (this.renderer.observers.length === 1) {
      render = {
        option: this.rendering('option'),
        item: this.rendering('item'),
      };
    }

    // prepare selectize compatible method to fetch data
    let load = null;
    if (this.loadValues.observers.length === 1) {
      load = (query: string, callback: (data: Array<any>) => void) => {
        // TODO find a way to display it to user
        // disabled async search if search string is below 3 characters long
        if (query.length < 3) {
          return callback([]);
        }
        this.loadValues.emit({ query, result: callback });
      };
    }

    const plugins = [].concat(this.plugins)

    // configure Selectize
    this.selectize = (jQuery(this.selector.nativeElement) as any).selectize({
      valueField: this.idField,
      labelField: this.labelField,
      searchField: this.labelField,
      placeholder: this.placeholder,
      maxItems: this.checkMultipleFalsy(),
      create: this.allowCreation,
      selectOnTab: true,
      persist: true,
      load: load,
      render: render,
      plugins: plugins,
      onChange: this.dataChanged.bind(this)
    } as any)[0].selectize;

    // force form-control on
    jQuery(this.selector.nativeElement).siblings().find('.selectize-input').addClass('form-control');

    // force refresh data when Selectize is initialized
    this.optionsChanged(this.tmpOptions);
    this.updateData(this.data);
    this.checkDisabled();
  }

  optionsChanged (options) {
    if (!options || !Object.keys(options).length) {
      return this.selectize && this.selectize.clearOptions();
    }

    if (this.selectize) {
      Object.keys(this.selectize.options).forEach(id => {
        if (!options.find(elem => elem[this.idField] === this.selectize.options[id][this.idField])) {
          this.selectize.removeOption(id);
        }
      });

      this.addOrUpdateOptions(options);
    } else {
      this.tmpOptions = options;
    }
  }

  dataChanged (value: any) {
    if (!value || !Array.isArray(value)) {
      return this.onChange(this.multiple ? [] : null);
    }

    if (this.multiple) {
      const selectedValues = value
        .map(id => this.selectize.options[id])
        .filter(item => !!item)
        .map(this.cleanOrder);
      this.onChange(selectedValues);
    } else {
      this.onChange(this.cleanOrder(this.selectize.options[value as any]));
    }
  }

  updateData (data) {
    // component not initialized yet
    if (!this.selectize) return;

    if (!data) {
      this.selectize.clear();
      return;
    }

    if (Array.isArray(data)) {
      this.addOrUpdateOptions(data);
      this.selectize.setValue(data.map(item => item[this.idField]));
    } else if (data && typeof data === 'object') {
      this.addOrUpdateOptions([data]);
      this.selectize.setValue(data[this.idField]);
    }
  }

  checkDisabled () {
    if (!this.selectize) return;

    if (this._disabled === true) {
      this.selectize.disable();
    } else if (this._disabled === false) {
      this.selectize.enable();
    }
  }

  rendering (type) {
    return i => {
      let html = i[this.labelField];
      this.renderer.emit({ val: i, html: htmlContent => html = htmlContent, type });
      return html;
    }
  }

  onChange = (_) => { };

  onTouched = () => { };

  writeValue (value: any): void {
    this.updateData(value);
  }

  registerOnChange (fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched (fn: () => void): void {
    this.onTouched = fn;
  }

  // function to clean object from selectize modifications
  private cleanOrder (item: any) {
    delete item.$order;
    return item;
  }

  private checkMultipleFalsy () {
    return (this.multiple) ? null : 1;
  }

  private addOrUpdateOptions (options) {
    options.forEach(option => {
      const value = option[this.idField];
      // check if option exist to call the right method ... sorry ... -_-
      if (this.selectize.options[value]) {
        this.selectize.updateOption(value, option);
      } else {
        this.selectize.addOption(option);
      }
    });
    this.selectize.refreshOptions(false);
  }

}
