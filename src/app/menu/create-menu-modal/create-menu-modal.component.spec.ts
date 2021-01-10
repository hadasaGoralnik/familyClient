import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuModalComponent } from './create-menu-modal.component';

describe('CreateMenuModalComponent', () => {
  let component: CreateMenuModalComponent;
  let fixture: ComponentFixture<CreateMenuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMenuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
