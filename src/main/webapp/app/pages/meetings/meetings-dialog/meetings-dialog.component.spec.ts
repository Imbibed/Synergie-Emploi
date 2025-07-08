import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsDialogComponent } from './meetings-dialog.component';

describe('MeetingsDialogComponent', () => {
  let component: MeetingsDialogComponent;
  let fixture: ComponentFixture<MeetingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
