import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImperativeComponent } from './components/imperative/imperative.component';
import { ImperativeErrorComponent } from './components/imperative-error/imperative-error.component';
import { ReactiveComponent } from './components/reactive/reactive.component';
import { ReactiveImprovedComponent } from './components/reactive-improved/reactive-improved.component';

@NgModule({
  declarations: [
    AppComponent,
    ImperativeComponent,
    ImperativeErrorComponent,
    ReactiveComponent,
    ReactiveImprovedComponent,
  ],
  imports: [CommonModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
