import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaproducerconsumerpageComponent } from './javaproducerconsumerpage.component';

describe('JavaproducerconsumerpageComponent', () => {
  let component: JavaproducerconsumerpageComponent;
  let fixture: ComponentFixture<JavaproducerconsumerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaproducerconsumerpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaproducerconsumerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
