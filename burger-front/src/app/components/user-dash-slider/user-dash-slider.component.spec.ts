import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashSliderComponent } from './user-dash-slider.component';

describe('UserDashSliderComponent', () => {
  let component: UserDashSliderComponent;
  let fixture: ComponentFixture<UserDashSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDashSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
