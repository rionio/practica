import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Options } from 'src/app/interfaces/registro';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent {
  constructor(private readonly _registroService: RegistroService, 
    private formBuilder: FormBuilder) {}

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  dataInOneArray( data : Observable<any[]>): any[] {
    const buffer = [];
    let temp: any[] = []
    data.subscribe(data => {temp = data});
    for (let i = 0; i < temp.length; i++) {
      const element = temp[i];
      for (const keys in element){
        while ( element[keys].length > 0) {
          const item = element[keys].shift();
          buffer.push(item);
        }
      }
    }
    return buffer;
  }
  
  options = this.formBuilder.group({
    company: 0,
    user: 0,
    inter: 15,
    dateStart: new Date('2017-02-23T19:41:21.396+0000')  ,
    dateEnd: new Date('2017-02-23T19:41:21.396+0000'),

  });

  public Update(): void {
    const data = this._registroService.getSessions(this.options);
    this.lineChartData.datasets[0].data = this.dataInOneArray(data);
    this.chart?.update();
  }

}