import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hasError1!: boolean;
  hasError2!: boolean;
  hasError3!: boolean;
  hasError4!: boolean;

  constructor() {}
}
