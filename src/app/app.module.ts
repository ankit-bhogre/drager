import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrAirliquidComponent } from './uicomponent/dr-airliquid/dr-airliquid.component';

@NgModule({
  declarations: [
    AppComponent,
    DrAirliquidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
