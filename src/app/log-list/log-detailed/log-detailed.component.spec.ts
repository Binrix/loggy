import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDetailedComponent } from './log-detailed.component';

describe('LogDetailedComponent', () => {
  let component: LogDetailedComponent;
  let fixture: ComponentFixture<LogDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
