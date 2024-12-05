import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDashComponent } from './list-dash.component';

describe('ListDashComponent', () => {
  let component: ListDashComponent;
  let fixture: ComponentFixture<ListDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
