import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorPortalPage } from './profesor-portal.page';

describe('ProfesorPortalPage', () => {
  let component: ProfesorPortalPage;
  let fixture: ComponentFixture<ProfesorPortalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorPortalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
