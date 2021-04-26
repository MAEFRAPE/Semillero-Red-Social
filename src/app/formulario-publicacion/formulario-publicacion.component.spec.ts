import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPublicacionComponent } from './formulario-publicacion.component';

describe('FormularioPublicacionComponent', () => {
  let component: FormularioPublicacionComponent;
  let fixture: ComponentFixture<FormularioPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
