import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesItemComponent } from './wishes-item.component';

describe('WishesItemComponent', () => {
  let component: WishesItemComponent;
  let fixture: ComponentFixture<WishesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [WishesItemComponent]
});
    fixture = TestBed.createComponent(WishesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
