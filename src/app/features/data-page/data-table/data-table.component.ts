import { Component, computed, inject, Input } from '@angular/core';
import { TraineeStateService } from '../../../services/trainee-state.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Trainee } from '../../../models/trainee.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

  @Input() trainees: Trainee[] = [];
  private state = inject(TraineeStateService);
   // trainees = this.state.trainees$;

  displayedColumns = ['id', 'name', 'date', 'grade', 'subject'];

  //rows = this.state.filteredTrainees$;

  rows() {
  return this.trainees;
}

  onSelect(row: Trainee) {
    this.state.selectTrainee(row);
  }
}


