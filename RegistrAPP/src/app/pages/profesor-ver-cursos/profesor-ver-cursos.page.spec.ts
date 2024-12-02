import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorVerCursosPage } from './profesor-ver-cursos.page';

describe('ProfesorVerCursosPage', () => {
  let component: ProfesorVerCursosPage;
  let fixture: ComponentFixture<ProfesorVerCursosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorVerCursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
