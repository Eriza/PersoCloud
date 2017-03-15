import { Component, OnInit } from '@angular/core';
import { AnalyzeModel } from './analyze.model';

import { environment } from '../environments/environment';
import { AnalyzeServiceHttp } from './analyze.service.http';
import { AnalyzeServiceDummy } from './analyze.service.dummy';

@Component({
  selector: 'donnees',
  templateUrl: './donnees.component.html',
  providers: [AnalyzeServiceHttp, AnalyzeServiceDummy]
})
export class DonneesComponent implements OnInit {
  donnees: AnalyzeModel;
  constructor(private AnalyzeServiceHttp: AnalyzeServiceHttp, private AnalyzeServiceDummy: AnalyzeServiceDummy) { }
  
  ngOnInit(): void {
    this.getAnalyze();
  }
  getAnalyze(): void {
	if(environment.analyze_service == "http") {
	  this.AnalyzeServiceHttp.getResults().then(results => this.donnees = results);
	} 
	else {
	   this.AnalyzeServiceDummy.getResults().then(results => this.donnees = results);
	}
  }  
}
