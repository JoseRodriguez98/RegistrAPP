import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorVerAsistenciasPage } from './profesor-ver-asistencias.page';

describe('ProfesorVerAsistenciasPage', () => {
  let component: ProfesorVerAsistenciasPage;
  let fixture: ComponentFixture<ProfesorVerAsistenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorVerAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
