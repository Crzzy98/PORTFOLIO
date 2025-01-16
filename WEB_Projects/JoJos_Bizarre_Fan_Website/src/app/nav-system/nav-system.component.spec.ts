import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSystemComponent } from './nav-system.component';

describe('NavSystemComponent', () => {
  let component: NavSystemComponent;
  let fixture: ComponentFixture<NavSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
