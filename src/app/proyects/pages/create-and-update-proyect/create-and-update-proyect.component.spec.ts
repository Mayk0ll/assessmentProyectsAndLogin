import { ComponentFixture, TestBed } from '@angular/core/testing';

import CreateAndUpdateProyectComponent from './create-and-update-proyect.component';

describe('CreateAndUpdateProyectComponent', () => {
  let component: CreateAndUpdateProyectComponent;
  let fixture: ComponentFixture<CreateAndUpdateProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAndUpdateProyectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAndUpdateProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
