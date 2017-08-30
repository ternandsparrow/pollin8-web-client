import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P8CardComponent } from './p8-card.component';

describe('P8CardComponent', () => {
  let component: P8CardComponent;
  let fixture: ComponentFixture<P8CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P8CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P8CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
