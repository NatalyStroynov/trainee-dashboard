// chart-drag.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChartDragService {
  // current charts shown in top 2 zones
  readonly topCharts = signal<(1 | 2  |3)[]>([1, 3]);

  // chart hidden in the bottom zone
  readonly hiddenChart = signal<1 | 2 | 3>(3);

  moveToTop(fromBottom: boolean) {
    const top = this.topCharts();
    const hidden = this.hiddenChart();

    if (fromBottom && !top.includes(hidden as 1 | 2 | 3)) {
      // rotate the top charts, push the hidden one into the top
      const removed = top.pop()!;
      this.topCharts.set([hidden as 1 | 2 | 3, ...top]);
      this.hiddenChart.set(removed);
    }
  }
}
