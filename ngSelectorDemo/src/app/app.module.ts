import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgSelectorModule } from 'ng-selector';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
