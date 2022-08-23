import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlEComponent } from './control-e.component';

describe('ControlEComponent', () => {
  let component: ControlEComponent;
  let fixture: ComponentFixture<ControlEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
