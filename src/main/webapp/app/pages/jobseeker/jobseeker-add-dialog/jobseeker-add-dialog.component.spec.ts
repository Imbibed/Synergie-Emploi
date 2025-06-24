import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerAddDialogComponent } from './jobseeker-add-dialog.component';

describe('JobseekerAddDialogComponent', () => {
  let component: JobseekerAddDialogComponent;
  let fixture: ComponentFixture<JobseekerAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobseekerAddDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobseekerAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
