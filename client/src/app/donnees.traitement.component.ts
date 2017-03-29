import { Component, OnInit, Input } from '@angular/core';
import { AnalyzeModel } from './analyze.model';

import { environment } from '../environments/environment';

@Component({
  selector: 'donnees-traitement',
  templateUrl: './donnees.traitement.component.html'
})
export class DonneesTraitementComponent{	
  @Input()
  donnees : AnalyzeModel;
  label: String[];
  valuesForChart: number[];
  
  traiter(): void {
	  this.label = [];
	  this.valuesForChart = [];
	  var data = {};
	  var i;
	  
	  /*for(i=0; i<this.donnees.cozy.meta.count;i++){
			data = this.donnees.cozy.data[i];
			console.log(data["vendor"]);
			for(var j in data){
				console.log(j);
			}
			console.log(data);
	  }*/
	  
	  
	  var vendor;
	  for(i=0; i<this.donnees.cozy.meta.count;i++){
			vendor = this.donnees.cozy.data[i]["vendor"];
			if(vendor in data){
				data[vendor] += this.donnees.cozy.data[i]["value"];
			}else{
				data[vendor] = this.donnees.cozy.data[i]["value"];
			}
	  }
	  for(i=0; i<this.donnees.engine.meta.count; i++){
			vendor = this.donnees.engine.data[i]["vendor"];
			if(vendor in data){
				data[vendor] += this.donnees.engine.data[i]["value"];
			}else{
				data[vendor] = this.donnees.engine.data[i]["value"];
			}
	  }
	  for(vendor in data){
		console.log(vendor + " :" + data[vendor]);
	  }
	  
	  //Start displaying in console
	  for(vendor in data){
		  this.label.push(vendor);
		  this.valuesForChart.push(data[vendor]);
	  }
	  console.log(this.label);
	  console.log(this.valuesForChart);
	  	  //end displaying in console

  }
  
  traiterWithFilter(filterName: string): void {
	  this.label = [];
	  this.valuesForChart = [];
	  var data = {}; //
	  var i;

	  var oneFilterMember;
	  for(i=0; i<this.donnees.cozy.meta.count;i++){
			oneFilterMember = this.donnees.cozy.data[i][filterName];
			if(oneFilterMember in data){
				data[oneFilterMember] += this.donnees.cozy.data[i]["value"];
			}else{
				data[oneFilterMember] = this.donnees.cozy.data[i]["value"];
			}
	  }
	  for(i=0; i<this.donnees.engine.meta.count; i++){
			oneFilterMember = this.donnees.engine.data[i][filterName];
			if(oneFilterMember in data){
				data[oneFilterMember] += this.donnees.engine.data[i]["value"];
			}else{
				data[oneFilterMember] = this.donnees.engine.data[i]["value"];
			}
	  }
	  for(oneFilterMember in data){
		console.log(oneFilterMember + " :" + data[oneFilterMember]);
	  }
	  /*
	  //Start displaying in console
	  for(oneFilterMember in data){
		  this.label.push(oneFilterMember);
		  this.valuesForChart.push(data[oneFilterMember]);
	  }
	  console.log(this.label);
	  console.log(this.valuesForChart);
	  	  //end displaying in console
*/
  }

  ngOnInit(): void {
	  this.traiter();
  }
  
  }
