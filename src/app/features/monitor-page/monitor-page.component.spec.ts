import { TestBed } from '@angular/core/testing';
import { MonitorPageComponent } from './monitor-page.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('MonitorPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorPageComponent], 
      providers: [
        provideAnimations(),          
        provideRouter([]),          
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MonitorPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
