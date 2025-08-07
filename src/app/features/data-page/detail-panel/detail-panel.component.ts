import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TraineeStateService } from '../../../services/trainee-state.service';
import { Trainee } from '../../../models/trainee.model';


@Component({
  selector: 'app-detail-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss']
})
export class DetailPanelComponent implements OnInit {
  private fb = inject(FormBuilder);
  private state = inject(TraineeStateService);

  trainee = computed(() => this.state.selectedTrainee$());
  form = signal<FormGroup>(this.createEmptyForm());
  isNew = signal(false); // флаг для Add

  constructor() {
    effect(() => {
      const trainee = this.trainee();

      if (trainee) {
        this.isNew.set(false);
        this.form.set(this.createFormFromTrainee(trainee));
      } else {
        this.isNew.set(true);
        this.form.set(this.createEmptyForm());
      }
    }, { allowSignalWrites: true });
  }
  ngOnInit(): void {

    window.addEventListener('save-trainee', () => this.onSubmit());

  }

  private createFormFromTrainee(trainee: Trainee): FormGroup {
    return this.fb.group({
      id: [{ value: trainee.id, disabled: true }],
      name: [trainee.name ?? '', Validators.required],
      subject: [trainee.subject ?? ''],
      grade: [trainee.grade ?? 0],
      date: [this.formatDateForInput(trainee.date)],
      email: [trainee.email ?? ''],
      address: [trainee.address ?? ''],
      city: [trainee.city ?? ''],
      country: [trainee.country ?? ''],
      zip: [trainee.zip ?? '']
    });
  }

  private createEmptyForm(): FormGroup {
    return this.fb.group({
      id: [{ value: '', disabled: false }],
      name: [''],
      subject: [''],
      grade: [0],
      date: [this.formatDateForInput(new Date())],
      email: [''],
      address: [''],
      city: [''],
      country: [''],
      zip: [''],
    });
  }



  onSubmit() {
    const formValue = this.form()?.getRawValue();
    if (this.form()?.valid && formValue) {
      const trainee: Trainee = {
        ...formValue,
        date: new Date(formValue.date)
      };

      if (this.isNew()) {
        this.state.addTrainee(trainee);
      } else {
        this.state.updateTrainee(trainee);
      }
    }
  }


  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
}
