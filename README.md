# ng-selector [![Build Status](https://travis-ci.org/Taranys/ng-selector.png?branch=master)](https://travis-ci.org/Taranys/ng-selector)
Custom select to replace ng-select component

## Instalation

1. Install NgSelector

  `npm i --save ng-selector`

2. Include Selectize CSS into your project

  `node_modules/selectize/dist/css/selectize.bootstrap3.css`

3. Add NgSelectorModule as dependency

```typescript
import { NgModule } from '@angular/core';
import { NgSelectorModule } from 'ng-selector';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...,
    NgSelectorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
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

### Simple selection

```typescript
export class AppComponent {
  selected: any;

  values = [
    { id: 1, label: 'First value' },
    { id: 2, label: 'Second value' },
    { id: 3, label: 'Another one' },
    { id: 42, label: 'Best value' },
  ];
}
```

```html
  <ng-selector name="selector" [(ngModel)]="selected" [options]="values"></ng-selector>
```

### Custom object

```typescript
export class AppComponent {
  values = [
    { uid: 1, nameOfObject: 'First value' },
    { uid: 2, nameOfObject: 'Second value' },
    { uid: 3, nameOfObject: 'Another one' },
    { uid: 42, nameOfObject: 'Best value' },
  ];

  selected = this.values[0];
}
```

```html
  <ng-selector name="selector" [(ngModel)]="selected" [options]="values" id-field="uid" label-field="nameOfObject"></ng-selector>
```

### Multiple selection

```html
  <ng-selector name="selector" [(ngModel)]="selected" [options]="values" 
      multiple="true" placeholder="Choose any values you want...">
  </ng-selector>
```

### Integration with NgForm

```typescript
export class AppComponent {
  values = [
    { id: 1, name: 'First value' }, { id: 2, name: 'Second value' },
    { id: 3, name: 'Another one' }, { id: 42, name: 'Best value' },
  ];

  selected = this.values[0];

  get disabled() {
    return this.formConfirmed;
  }
}
```

```html
  <ng-selector name="selector" [(ngModel)]="selected" [options]="values" [readonly]="disabled" required>
  </ng-selector>
```

### Async data loading

```typescript
export class AppComponent {
  selected: any;

  constructor(private http: Http) {}

  fetchServer(event) {
     this.http.get(`${url}?search=${event.query}`)
        .subscribe(response => event.result(response.json()));
  }
}
```

```html
  <ng-selector name="selector" [(ngModel)]="selected" (loadValues)="fetchServer($event)"></ng-selector>
```

### Custom rendering

/!\ rendering function has to be sync

```typescript
export class AppComponent {
  selected: any;

  customRendering(renderer) {
    const item = renderer.val;
    renderer.html(`<small>${item.id} - ${item.label}</small>`);
  }
}
```

```html
  <ng-selector name="selector" [(ngModel)]="selected" (renderer)="customRendering($event)"></ng-selector>
```