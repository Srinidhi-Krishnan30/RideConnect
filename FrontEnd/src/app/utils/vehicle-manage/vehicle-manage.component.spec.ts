import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleManageComponent } from './vehicle-manage.component';

describe('VehicleManageComponent', () => {
  let component: VehicleManageComponent;
  let fixture: ComponentFixture<VehicleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
