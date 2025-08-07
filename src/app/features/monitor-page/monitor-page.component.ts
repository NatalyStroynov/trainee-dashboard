import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MonitorStateService } from '../../services/monitor-state.service';

interface MonitorTrainee {
  id: string;
  name: string;
  average: number;
  exams: number;
}

@Component({
  selector: 'app-monitor-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './monitor-page.component.html',
  styleUrl: './monitor-page.component.scss'
})
export class MonitorPageComponent {
  private state = inject(MonitorStateService);

  filters = this.state.filters;
  allIds = this.state.allIds;


  pageSize = this.state.pageSize;

  trainees = computed<MonitorTrainee[]>(() => {
    const grouped = new Map<string, { name: string; grades: number[] }>();

    for (const t of this.state.filteredTrainees()) {
      if (!grouped.has(t.id)) {
        grouped.set(t.id, { name: t.name, grades: [t.grade] });
      } else {
        grouped.get(t.id)!.grades.push(t.grade);
      }
    }

    const result = Array.from(grouped.entries()).map(([id, { name, grades }]) => ({
      id,
      name,
      average: Math.round(grades.reduce((a, b) => a + b, 0) / grades.length),
      exams: grades.length
    }));

    const start = this.pageIndex() * this.pageSize();
    return result.slice(start, start + this.pageSize());
  });

  totalPages = computed(() => {
    const grouped = new Map<string, true>();

    for (const t of this.state.filteredTrainees()) {
      grouped.set(t.id, true); // считаем уникальные id
    }

    const totalGroups = grouped.size;
    return Math.ceil(totalGroups / this.pageSize());
  });
  constructor() {
    effect(() => {
      const filters = this.filters();
      console.log('🔍 filters().ids =', this.filters().ids);
    });
  }

  prevPage() {
    this.state.prevPage();
  }

  nextPage() {
    this.state.nextPage();
  }

  pageIndex = this.state.pageIndex;

  updatePatch(patch: Partial<Parameters<typeof this.state.updateFilters>[0]>) {
    this.state.updateFilters(patch);
  }

}
