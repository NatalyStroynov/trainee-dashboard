import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-toolbar',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './page-toolbar.component.html',
  styleUrl: './page-toolbar.component.scss'
})
export class PageToolbarComponent {

}
