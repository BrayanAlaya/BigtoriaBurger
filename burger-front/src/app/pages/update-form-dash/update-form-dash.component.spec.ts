import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormDashComponent } from './update-form-dash.component';

describe('UpdateFormDashComponent', () => {
  let component: UpdateFormDashComponent;
  let fixture: ComponentFixture<UpdateFormDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFormDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFormDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
