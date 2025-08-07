import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { TraineeStateService } from '../../services/trainee-state.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';   
import { DataTableComponent } from './data-table/data-table.component';
import { DataFilterBarComponent } from './data-filter-bar/data-filter-bar.component';
import { DetailPanelComponent } from './detail-panel/detail-panel.component';
import { FormToolbarComponent } from './form-toolbar/form-toolbar.component';

@Component({
  selector: 'app-data-page',
  standalone: true,
  imports: [
      CommonModule,
      MatToolbarModule,
      MatTabsModule,
      MatInputModule,
      MatButtonModule,
      FormsModule,
      RouterModule,      
      DataTableComponent,     
      DataFilterBarComponent,
      DetailPanelComponent,
      FormToolbarComponent],
  templateUrl: './data-page.component.html',
  styleUrl: './data-page.component.scss'
})
export class DataPageComponent {
  private state = inject(TraineeStateService);

  pageIndex = this.state.pageIndex;
pageSize = this.state.pageSize;
totalPages = this.state.totalPages;
pagedTrainees = this.state.pagedTrainees;

nextPage() {
  this.state.nextPage();
}

prevPage() {
  this.state.prevPage();
}


  constructor() {
    
  }

  ngOnInit() {
  
  }

}
