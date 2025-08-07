import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TraineeStateService } from './services/trainee-state.service';
import { PageToolbarComponent } from './shared/page-toolbar/page-toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trainee-dashboard';
  private state = inject(TraineeStateService);

  constructor() {
    this.state.loadTrainees(); // ← теперь trainees будут загружены при любом старте
  }
}
