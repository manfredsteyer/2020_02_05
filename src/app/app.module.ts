import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, BrandComponent, ProductComponent, GroupComponent, SizeComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ProductComponent,
    GroupComponent,
    SizeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
