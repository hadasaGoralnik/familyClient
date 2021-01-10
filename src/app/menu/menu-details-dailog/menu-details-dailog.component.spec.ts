import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDetailsDailogComponent } from './menu-details-dailog.component';

describe('MenuDetailsDailogComponent', () => {
  let component: MenuDetailsDailogComponent;
  let fixture: ComponentFixture<MenuDetailsDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDetailsDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDetailsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
