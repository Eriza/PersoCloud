import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AnalyzeModel } from './analyze.model';

@Injectable()
export class AnalyzeServiceHttp {
	constructor(private http: Http) { }

	getResults(): Promise<AnalyzeModel> {
		return this.http.get("/apps/persocloud/api/analyze/field=Bill")
		   .toPromise()
		   .then(response => response.json() as AnalyzeModel)
		   .catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}