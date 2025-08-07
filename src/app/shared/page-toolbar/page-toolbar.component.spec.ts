import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageToolbarComponent } from './page-toolbar.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('PageToolbarComponent', () => {
  let component: PageToolbarComponent;
  let fixture: ComponentFixture<PageToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageToolbarComponent],
      providers: [
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
              data: {},
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
