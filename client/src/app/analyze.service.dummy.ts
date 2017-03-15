import { Injectable } from '@angular/core';
import { AnalyzeModel } from './analyze.model';
import { DONNEES } from './analyze.mock';

@Injectable()
export class AnalyzeServiceDummy {
  	getResults(): Promise<AnalyzeModel> {
    	return Promise.resolve(DONNEES);
  	}
}