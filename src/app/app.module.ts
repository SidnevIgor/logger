import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoggerSharedModule } from 'projects/logger-shared/src/public-api';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoggerSharedModule.forRoot(environment, 'LocalStorage'),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
