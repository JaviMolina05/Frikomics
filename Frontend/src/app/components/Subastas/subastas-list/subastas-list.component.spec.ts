import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastasListComponent } from './subastas-list.component';

describe('SubastasListComponent', () => {
  let component: SubastasListComponent;
  let fixture: ComponentFixture<SubastasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubastasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubastasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
