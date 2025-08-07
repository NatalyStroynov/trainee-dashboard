import { computed, effect, Injectable, signal } from '@angular/core';
import { Trainee } from '../models/trainee.model';
import { FilterState } from '../models/filter-state.model';
import { MOCK_TRAINEES } from '../mocks/trainees.mock';

@Injectable({ providedIn: 'root' })
export class TraineeStateService {
    private trainees = signal<Trainee[]>([]);
    private selectedTrainee = signal<Trainee | null>(null);
    private filters = signal<FilterState>({
        searchText: '',
        gradeRange: undefined,
        dateRange: undefined,
    });

    // readonly signals
    readonly trainees$ = this.trainees.asReadonly();
    readonly selectedTrainee$ = this.selectedTrainee.asReadonly();
    readonly filters$ = this.filters.asReadonly();

    private selectedIds = signal<string[]>([]);
    readonly selectedIds$ = this.selectedIds.asReadonly();

    private selectedSubjects = signal<string[]>([]);
    readonly selectedSubjects$ = this.selectedSubjects.asReadonly();

    readonly filteredTrainees$ = computed(() => {
        const filter = this.filters();
        const search = filter.searchText?.toLowerCase()?.trim() || '';

        if (!search) return this.trainees();

        return this.trainees().filter((t) => {
            if (search.startsWith('id:')) {
                return t.id.toLowerCase().includes(search.replace('id:', '').trim());
            }
            if (search.startsWith('>')) {
                const value = Number(search.substring(1));
                return !isNaN(value) && t.grade > value;
            }
            if (search.startsWith('<')) {
                const value = Number(search.substring(1));
                return !isNaN(value) && t.grade < value;
            }

            // 👇 теперь ищем и по id тоже
            return (
                t.id.toLowerCase().includes(search) ||
                t.name.toLowerCase().includes(search) ||
                t.subject.toLowerCase().includes(search)
            );
        });
    });


    readonly traineesForIdCharts$ = computed(() => {
        const all = this.trainees();
        const selectedIds = this.selectedIds();

        if (selectedIds.length === 0) return all;

        return all.filter(t => selectedIds.includes(t.id));
    });



    setSelectedSubjects(subjects: string[]) {
        this.selectedSubjects.set(subjects);
    }

    readonly traineesForSubjectCharts$ = computed(() => {
        const all = this.trainees();
        const subjects = this.selectedSubjects();

        if (subjects.length === 0) return all;

        return all.filter(t => subjects.includes(t.subject));
    });


    constructor() {
        effect(() => {
            this.filters$(); // подписка
            this.pageIndex.set(0); // сбрасываем страницу при фильтрации
        }, { allowSignalWrites: true });
    }
    // methods

    loadTrainees() {
        this.trainees.set(MOCK_TRAINEES);
    }

    setTrainees(data: Trainee[]) {
        this.trainees.set(data);
    }

    selectTrainee(t: Trainee | null) {
        this.selectedTrainee.set(t);
    }

    // 👇 создание нового (очищает форму)
    startNewTrainee() {
        this.selectedTrainee.set(null);
    }

    // 👇 добавление в список
    addTrainee(newTrainee: Trainee) {
        this.trainees.update(prev => [...prev, newTrainee]);
        this.selectedTrainee.set(newTrainee);
    }

    // 👇 обновление
    updateTrainee(updated: Trainee) {
        this.trainees.update(prev =>
            prev.map(t => (t.id === updated.id ? updated : t))
        );
        this.selectedTrainee.set(updated);
    }

    // 👇 удаление
    removeTrainee(id: string) {
        this.trainees.update(prev => prev.filter(t => t.id !== id));
        this.selectedTrainee.set(null);
    }

    updateFilters(patch: Partial<FilterState>) {
        this.filters.update((prev) => ({ ...prev, ...patch }));
    }



    setSelectedIds(ids: string[]) {
        this.selectedIds.set(ids);
    }

    resetFilters() {
        this.filters.set({
            searchText: '',
            gradeRange: undefined,
            dateRange: undefined,
        });
    }

    readonly availableSubjects$ = computed(() => {
        const filtered = this.traineesForIdCharts$();
        const subjects = new Set(filtered.map(t => t.subject));
        return Array.from(subjects);
    });


    readonly pageIndex = signal(0);
    readonly pageSize = signal(10);

    readonly pagedTrainees = computed(() => {
        const all = this.filteredTrainees$(); // если это signal
        const start = this.pageIndex() * this.pageSize();
        return all.slice(start, start + this.pageSize());
    });

    readonly totalPages = computed(() =>
        Math.ceil(this.filteredTrainees$().length / this.pageSize())
    );

    nextPage() {
        const next = this.pageIndex() + 1;
        if (next < this.totalPages()) {
            this.pageIndex.set(next);
        }
    }

    prevPage() {
        const prev = this.pageIndex() - 1;
        if (prev >= 0) {
            this.pageIndex.set(prev);
        }
    }
}
