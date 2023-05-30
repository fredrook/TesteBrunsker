import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorretorLoginComponent } from './corretor-login.component';

describe('CorretorLoginComponent', () => {
  let component: CorretorLoginComponent;
  let fixture: ComponentFixture<CorretorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorretorLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorretorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
