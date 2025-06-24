import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersnetworkComponent } from './partnersnetwork.component';

describe('PartnersnetworkComponent', () => {
  let component: PartnersnetworkComponent;
  let fixture: ComponentFixture<PartnersnetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersnetworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersnetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
