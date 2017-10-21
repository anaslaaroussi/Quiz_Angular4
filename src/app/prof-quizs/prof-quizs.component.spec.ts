import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfQuizsComponent } from './prof-quizs.component';

describe('ProfQuizsComponent', () => {
  let component: ProfQuizsComponent;
  let fixture: ComponentFixture<ProfQuizsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfQuizsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfQuizsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
