import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobseekerComponent } from './edit-jobseeker.component';

describe('EditJobseekerComponent', () => {
  let component: EditJobseekerComponent;
  let fixture: ComponentFixture<EditJobseekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditJobseekerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditJobseekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
