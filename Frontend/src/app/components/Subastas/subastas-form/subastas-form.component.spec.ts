import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastasFormComponent } from './subastas-form.component';

describe('SubastasFormComponent', () => {
  let component: SubastasFormComponent;
  let fixture: ComponentFixture<SubastasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubastasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubastasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
