import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsAdminComponent } from './comics-admin.component';

describe('ComicsAdminComponent', () => {
  let component: ComicsAdminComponent;
  let fixture: ComponentFixture<ComicsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComicsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
