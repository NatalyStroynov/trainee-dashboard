import { Component, effect, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { TraineeStateService } from '../../../services/trainee-state.service';
import { Trainee } from '../../../models/trainee.model';

@Component({
  selector: 'app-chart-host',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-host.component.html',
  styleUrls: ['./chart-host.component.scss']
})
export class ChartHostComponent {
  @Input() title = 'Chart';
  @Input() chartId!: 1 | 2 | 3;
  @Input() set trainees(value: Trainee[]) {
    this._trainees.set(value);
  }

  @Input() groupBy: 'id' | 'subject' = 'id';

  private _trainees = signal<Trainee[]>([]);



  private state = inject(TraineeStateService);

  chartData: ChartData<'line'> = { labels: [], datasets: [] };
  chartType: ChartType = 'line';
  chartOptions: ChartOptions = { responsive: true };

  constructor() {
    effect(() => {
      const trainees = this._trainees();

      const grouped = trainees.reduce<Record<string, Trainee[]>>((acc, t) => {
        const key = t[this.groupBy]; 
        if (!acc[key]) acc[key] = [];
        acc[key].push(t);
        return acc;
      }, {});

      const datasets = Object.entries(grouped).map(([id, items]) => {
        const sorted = items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return {
          label: sorted[0].name ?? id,
          data: sorted.map(t => t.grade),
          tension: 0.3,
          fill: true
        };
      });

      const labels = this.getUniqueSortedDates(trainees).map(date =>
        this.formatDateForLabel(date)
      );

      this.chartData = {
        labels,
        datasets
      };
    });
  }
  private getUniqueSortedDates(trainees: Trainee[]): Date[] {
    const dateSet = new Set<string>();
    trainees.forEach(t => dateSet.add(new Date(t.date).toISOString()));
    return Array.from(dateSet)
      .map(d => new Date(d))
      .sort((a, b) => a.getTime() - b.getTime());
  }

  private formatDateForLabel(date: Date): string {
    return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
  }
}

