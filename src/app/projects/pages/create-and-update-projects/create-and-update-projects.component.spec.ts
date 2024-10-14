import { ComponentFixture, TestBed } from '@angular/core/testing';

import CreateAndUpdateprojectComponent from './create-and-update-projects.component';

describe('CreateAndUpdateprojectComponent', () => {
  let component: CreateAndUpdateprojectComponent;
  let fixture: ComponentFixture<CreateAndUpdateprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAndUpdateprojectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAndUpdateprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
