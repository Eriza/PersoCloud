import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PieChartDemoComponent } from './pie-chart-demo';
import { DoughnutChartDemoComponent } from './doughnut-chart-demo';
import { PolarAreaChartDemoComponent } from './polar-area-chart-demo';

//import { TabsModule, CollapseModule, DropdownModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DonneesComponent }	from './donnees.component';
import { DonneesTraitementComponent }	from './donnees.traitement.component';
import { AnalyzeService } from './analyze.service';

@NgModule({
  declarations: [
    AppComponent,
	DonneesComponent,
	DonneesTraitementComponent,
	PieChartDemoComponent,
	DoughnutChartDemoComponent,
	PolarAreaChartDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	ChartsModule//,
    //TabsModule.forRoot(),
   // CollapseModule.forRoot(),
   // DropdownModule.forRoot()
  ],
  providers: [
    AnalyzeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
