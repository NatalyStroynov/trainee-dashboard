import { Component, inject } from '@angular/core';
import { TraineeStateService } from '../../../services/trainee-state.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-toolbar',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './form-toolbar.component.html',
  styleUrl: './form-toolbar.component.scss'
})
export class FormToolbarComponent {
  private state = inject(TraineeStateService);

  onAdd() {
    this.state.startNewTrainee();
  }

  onRemove() {
    const current = this.state.selectedTrainee$();
    if (current) {
      if (confirm(`Are you sure you want to remove ${current.name}?`)) {
        this.state.removeTrainee(current.id);
      }
    }
  }

  onSave() {
    // Должно вызываться из detail-panel (не напрямую)
    const saveEvent = new CustomEvent('save-trainee');
    dispatchEvent(saveEvent);
  }

}
