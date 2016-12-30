# ng-selector
Custom select to replace ng-select component

## Instalation

1. Install NgSelector

  `npm i --save ng-selector`

2. Include Selectize CSS into your project

  `node_modules/selectize/dist/css/selectize.bootstrap3.css`

3. Add NgSelectorModule as dependency

```typescript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectorModule } from 'ng-selector';

@NgModule({
  declarations: [ ... ],
  imports:      [ ..., NgSelectorModule]
})
export class MyModule {
}
```

## API

```html
    <ng-selector
      [(ngModel)]="selectedObject"
      [options]="arrayOfObjects"
      [readonly]="disabled"
      (loadValues)="fetchDataFromServer($event.query, $event.result)"
      (renderer)="render($event.item, $event.html)"
      placeholder="A placeholder..."
      id-field="uid" // customize id field name - 'id' by default
      label-field="name" // customize label field name - 'label' by default
      multiple="true" // allow multiple selection
      allow-creation="true" // allow user to manually enter a new value
      >
    </ng-selector>
```


## Usage

Main usage is to let user select an object into an array of object. It is possible to do async data loading and custom rendering.

// ONGOING - Exemples