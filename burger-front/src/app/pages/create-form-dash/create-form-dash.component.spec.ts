import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormDashComponent } from './create-form-dash.component';

describe('CreateFormDashComponent', () => {
  let component: CreateFormDashComponent;
  let fixture: ComponentFixture<CreateFormDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFormDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFormDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
