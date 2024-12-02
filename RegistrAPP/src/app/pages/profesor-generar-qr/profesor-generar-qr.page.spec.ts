import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorGenerarQrPage } from './profesor-generar-qr.page';

describe('ProfesorGenerarQrPage', () => {
  let component: ProfesorGenerarQrPage;
  let fixture: ComponentFixture<ProfesorGenerarQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorGenerarQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
