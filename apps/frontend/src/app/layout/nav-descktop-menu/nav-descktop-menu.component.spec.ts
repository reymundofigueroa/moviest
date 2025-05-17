import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDescktopMenuComponent } from './nav-descktop-menu.component';

describe('NavDescktopMenuComponent', () => {
  let component: NavDescktopMenuComponent;
  let fixture: ComponentFixture<NavDescktopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDescktopMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDescktopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
