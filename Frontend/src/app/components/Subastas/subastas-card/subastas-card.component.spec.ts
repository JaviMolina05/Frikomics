import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastasCardComponent } from './subastas-card.component';

describe('SubastasCardComponent', () => {
  let component: SubastasCardComponent;
  let fixture: ComponentFixture<SubastasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubastasCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubastasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
