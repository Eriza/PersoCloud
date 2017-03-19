import { Component, OnInit } from '@angular/core';
import { AnalyzeModel } from './analyze.model';

import { environment } from '../environments/environment';
import { AnalyzeService } from './analyze.service';

@Component({
  selector: 'donnees',
  templateUrl: './donnees.component.html',
  providers: [AnalyzeService]
})
export class DonneesComponent {
  donnees: AnalyzeModel;
  constructor(private AnalyzeService: AnalyzeService) { }
  
  getAnalyze(): void {
	  this.AnalyzeService.getResults().then(results => this.donnees = results);
  }  
}
