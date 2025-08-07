import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TraineeStateService } from '../../../services/trainee-state.service';

@Component({
  selector: 'app-data-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './data-filter-bar.component.html',
  styleUrl: './data-filter-bar.component.scss'
})
export class DataFilterBarComponent {
  private state = inject(TraineeStateService);
  searchText = this.state.filters$().searchText ?? '';

  onSearchChange(value: string) {
    this.searchText = value;
    this.state.updateFilters({ searchText: value });
  }
  constructor() {    
  }
  onAdd() {
  this.state.startNewTrainee();
}

}
