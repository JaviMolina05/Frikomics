import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitorialPedidosComponent } from './hitorial-pedidos.component';

describe('HitorialPedidosComponent', () => {
  let component: HitorialPedidosComponent;
  let fixture: ComponentFixture<HitorialPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HitorialPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitorialPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
