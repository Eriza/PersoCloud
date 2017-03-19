import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DonneesComponent }	from './donnees.component';
import { AnalyzeService } from './analyze.service';

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
    AnalyzeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
