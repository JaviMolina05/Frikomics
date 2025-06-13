import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPedidosCardComponent } from './historial-pedidos-card.component';

describe('HistorialPedidosCardComponent', () => {
  let component: HistorialPedidosCardComponent;
  let fixture: ComponentFixture<HistorialPedidosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialPedidosCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialPedidosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
