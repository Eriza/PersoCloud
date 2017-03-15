import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DonneesComponent }	from './donnees.component';
import { AnalyzeServiceHttp } from './analyze.service.http';
import { AnalyzeServiceDummy } from './analyze.service.dummy';

@NgModule({
  declarations: [
    AppComponent,
	DonneesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
	AnalyzeServiceHttp,
	AnalyzeServiceDummy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
