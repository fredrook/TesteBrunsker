import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorretorPageComponent } from './corretor-page.component';

describe('CorretorPageComponent', () => {
  let component: CorretorPageComponent;
  let fixture: ComponentFixture<CorretorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorretorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorretorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
