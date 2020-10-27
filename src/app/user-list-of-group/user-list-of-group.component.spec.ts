import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListOfGroupComponent } from './user-list-of-group.component';

describe('UserListOfGroupComponent', () => {
  let component: UserListOfGroupComponent;
  let fixture: ComponentFixture<UserListOfGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListOfGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListOfGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
