/**
 * This is only for local test
 */
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgSelectorModule } from 'ng-selector';

@Component({
  selector: 'app',
  template: `
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <a class="navbar-brand" href="https://github.com/Taranys/ng-selector">Github</a>
  </nav>

  <div class="container">

    <div class="starter-template">
      <h2>Simple example</h2>
      <ng-selector
        [(ngModel)]="selected"
        [options]="values">
      </ng-selector>

      <h2>With plugins</h2>
      <ng-selector
        [(ngModel)]="multipleSelection"
        [options]="values"
        [plugins]="['remove_button']"
        multiple="true">
      </ng-selector>
    </div>

  </div>
  `
})
class AppComponent {
  selected = 'Second value';
  multipleSelection = new Array<number>();

  values = [
    { id: 1, label: 'First value' },
    { id: 2, label: 'Second value' },
    { id: 3, label: 'Another one' },
    { id: 42, label: 'Best value' },
  ];
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, FormsModule, NgSelectorModule]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
