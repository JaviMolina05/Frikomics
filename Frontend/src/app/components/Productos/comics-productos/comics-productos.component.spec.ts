import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsProductosComponent } from './comics-productos.component';

describe('ComicsProductosComponent', () => {
  let component: ComicsProductosComponent;
  let fixture: ComponentFixture<ComicsProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComicsProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicsProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
