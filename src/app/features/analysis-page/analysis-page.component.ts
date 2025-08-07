import { Component, inject } from '@angular/core';
import { ChartHostComponent } from './chart-host/chart-host.component';
import { AnalysisFiltersComponent } from './analysis-filters/analysis-filters.component';
import { HiddenChartButtonComponent } from './hidden-chart-button/hidden-chart-button.component';
import { TraineeStateService } from '../../services/trainee-state.service';
import { ChartDragService } from '../../services/chart-drag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis-page',
  standalone: true,
  imports: [ 
    CommonModule,
    AnalysisFiltersComponent,
    ChartHostComponent,
   HiddenChartButtonComponent],
  templateUrl: './analysis-page.component.html',
  styleUrl: './analysis-page.component.scss'
})
export class AnalysisPageComponent {

  private state = inject(TraineeStateService);
   chartService = inject(ChartDragService); 

  traineesForCharts = this.state.traineesForIdCharts$;
  traineesForSubjectChart = this.state.traineesForSubjectCharts$;

}
