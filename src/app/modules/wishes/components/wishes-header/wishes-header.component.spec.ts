import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesHeaderComponent } from './wishes-header.component';

describe('WishesPersonComponent', () => {
  let component: WishesHeaderComponent;
  let fixture: ComponentFixture<WishesHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishesHeaderComponent]
    });
    fixture = TestBed.createComponent(WishesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
