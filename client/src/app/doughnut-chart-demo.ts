import { Component, Input } from '@angular/core';

@Component({
  selector: 'doughnut-chart-demo',
  templateUrl: './doughnut-chart-demo.html'
})
export class DoughnutChartDemoComponent {
  // Doughnut
  @Input() public doughnutChartLabels:string[];
  @Input() public doughnutChartData:number[];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
