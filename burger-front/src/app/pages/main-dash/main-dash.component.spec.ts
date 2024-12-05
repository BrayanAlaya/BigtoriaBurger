import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashComponent } from './main-dash.component';

describe('MainDashComponent', () => {
  let component: MainDashComponent;
  let fixture: ComponentFixture<MainDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
