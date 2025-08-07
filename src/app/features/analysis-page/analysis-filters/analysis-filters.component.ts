import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TraineeStateService } from '../../../services/trainee-state.service';

@Component({
  selector: 'app-analysis-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule],
  templateUrl: './analysis-filters.component.html',
  styleUrl: './analysis-filters.component.scss'
})
export class AnalysisFiltersComponent {

  private state = inject(TraineeStateService);

  // временно: получаем trainee из state
  trainees = this.state.trainees$();
  selectedIds: string[] = [];

  readonly uniqueSubjects = this.state.availableSubjects$;
  selectedSubjects: string[] = [];

  onIdsChange() {
    this.state.setSelectedIds(this.selectedIds);
  }

  readonly uniqueIds = computed(() => {
    const all = this.state.trainees$();
    const ids = new Set(all.map(t => t.id));
    return Array.from(ids);
  });

  



  onSubjectsChange() {
    this.state.setSelectedSubjects(this.selectedSubjects);
  }


}
