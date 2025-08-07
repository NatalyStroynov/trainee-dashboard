import { Injectable, computed, effect, signal } from '@angular/core';
import { inject } from '@angular/core';
import { TraineeStateService } from './trainee-state.service';

export interface MonitorFilters {
    ids: string[];
    name: string;
    showPassed: boolean;
    showFailed: boolean;
}

@Injectable({ providedIn: 'root' })
export class MonitorStateService {
    private traineeService = inject(TraineeStateService);

    readonly filters = signal<MonitorFilters>({
        ids: [],
        name: '',
        showPassed: true,
        showFailed: true,
    });

    readonly allTrainees = computed(() => this.traineeService.trainees$());

    readonly filteredTrainees = computed(() => {
        const all = this.allTrainees();
        const f = this.filters();


        console.log('📊 total trainees:', all.length);
  console.log('📎 filters:', f);
        return all.filter(t => {
            const matchesId = f.ids.length === 0 || f.ids.includes(String(t.id));
            const matchesName = f.name === '' || t.name.toLowerCase().includes(f.name.toLowerCase());
            const passed = t.grade >= 65;
            const matchesState = (passed && f.showPassed) || (!passed && f.showFailed);

            return matchesId && matchesName && matchesState;
        });
    });

    readonly allIds = computed(() => [...new Set(this.allTrainees().map(t => String(t.id)))]);


    readonly pageIndex = signal(0);
    readonly pageSize = signal(10); // или 10

   /* readonly pagedTrainees = computed(() => {
        const trainees = this.filteredTrainees();
        const start = this.pageIndex() * this.pageSize();
        return trainees.slice(start, start + this.pageSize());
    });*/

    constructor() {
        effect(() => {
            this.filters(); // подписка на изменения
            this.allTrainees(); // подписка на смену исходных данных
            this.pageIndex.set(0); // сбрасываем страницу
            
        },{ allowSignalWrites: true });
    }
    nextPage() {
        const total = this.filteredTrainees().length;
        const nextIndex = this.pageIndex() + 1;
        if (nextIndex * this.pageSize() < total) {
            this.pageIndex.set(nextIndex);
        }
    }

   /* readonly totalPages = computed(() =>
        Math.ceil(this.filteredTrainees().length / this.pageSize())
    );*/
    prevPage() {
        const prevIndex = this.pageIndex() - 1;
        if (prevIndex >= 0) {
            this.pageIndex.set(prevIndex);
        }
    }

    updateFilters(patch: Partial<MonitorFilters>) {
        this.filters.update(current => ({ ...current, ...patch }));
    }
}
