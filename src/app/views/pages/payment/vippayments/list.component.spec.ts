import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipPaymentsComponent } from './list.component';

describe('ListComponent', () => {
  let component: VipPaymentsComponent;
  let fixture: ComponentFixture<VipPaymentsComponent>;

  beforeEach(async () => {VipPaymentsComponent
    await TestBed.configureTestingModule({
      declarations: [ VipPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
