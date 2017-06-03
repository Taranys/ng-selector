import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  selected = 'Second value';
  multipleSelection = [];

  values = [
    { id: 1, label: 'First value' },
    { id: 2, label: 'Second value' },
    { id: 3, label: 'Another one' },
    { id: 42, label: 'Best value' },
  ];
}
