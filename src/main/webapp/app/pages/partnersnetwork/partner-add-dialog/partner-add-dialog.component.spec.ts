import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAddDialogComponent } from './partner-add-dialog.component';

describe('PartnerAddDialogComponent', () => {
  let component: PartnerAddDialogComponent;
  let fixture: ComponentFixture<PartnerAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerAddDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnerAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
