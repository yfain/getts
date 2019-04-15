import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlockComponent } from './block';
import { TransactionFormComponent } from './transaction-form';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    BlockComponent,
    TransactionFormComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
