import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesPreviewComponent } from './wishes-preview.component';

describe('WishesPreviewComponent', () => {
  let component: WishesPreviewComponent;
  let fixture: ComponentFixture<WishesPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [WishesPreviewComponent]
});
    fixture = TestBed.createComponent(WishesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
