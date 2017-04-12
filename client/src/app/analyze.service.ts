import { Injectable } from '@angular/core';
import { AnalyzeModel } from './analyze.model';
import { DONNEES } from './analyze.mock';
import { environment } from '../environments/environment';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnalyzeService {
	constructor(private http: Http) { }

  	getResults(): Promise<AnalyzeModel> {
		// Si l'application a été compilé pour utilisé l'API moteur (http service)
		if(environment.analyze_service == "http") {	
    		return this.http.get("/apps/persocloud/api/analyze?field=Bill&metakey=amount")
				.toPromise()
				.then(response => response.json() as AnalyzeModel)
				.catch(this.handleError);					 
		}
		// Si l'application a éré compilé pour utilisé le dummy service
		else {
			return Promise.resolve(DONNEES());
		}
  	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}