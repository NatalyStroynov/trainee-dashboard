import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartDragService } from '../../../services/chart-drag.service';

@Component({
  selector: 'app-hidden-chart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hidden-chart-button.component.html',
  styleUrl: './hidden-chart-button.component.scss'
})
export class HiddenChartButtonComponent {
  constructor(public chartService: ChartDragService) {}

dropChart() {
  this.chartService.moveToTop(true); 

}
}
