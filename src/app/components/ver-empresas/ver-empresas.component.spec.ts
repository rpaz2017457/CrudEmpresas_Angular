import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEmpresasComponent } from './ver-empresas.component';

describe('VerEmpresasComponent', () => {
  let component: VerEmpresasComponent;
  let fixture: ComponentFixture<VerEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerEmpresasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
