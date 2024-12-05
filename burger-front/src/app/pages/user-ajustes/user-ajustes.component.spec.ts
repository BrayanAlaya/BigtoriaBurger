import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAjustesComponent } from './user-ajustes.component';

describe('UserAjustesComponent', () => {
  let component: UserAjustesComponent;
  let fixture: ComponentFixture<UserAjustesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAjustesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAjustesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
