import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastasDetailComponent } from './subastas-detail.component';

describe('SubastasDetailComponent', () => {
  let component: SubastasDetailComponent;
  let fixture: ComponentFixture<SubastasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubastasDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubastasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
