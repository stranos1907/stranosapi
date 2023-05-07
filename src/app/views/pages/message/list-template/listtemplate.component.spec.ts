import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTemplateComponent } from './listtemplate.component';

describe('ListComponent', () => {
  let component: ListTemplateComponent;
  let fixture: ComponentFixture<ListTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
