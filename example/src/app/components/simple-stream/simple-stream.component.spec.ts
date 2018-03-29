import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleStreamComponent } from './simple-stream.component';

describe('SimpleStreamComponent', () => {
  let component: SimpleStreamComponent;
  let fixture: ComponentFixture<SimpleStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
