import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P8HelpComponent } from './p8-help.component';

describe('P8HelpComponent', () => {
  let component: P8HelpComponent;
  let fixture: ComponentFixture<P8HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P8HelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P8HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
