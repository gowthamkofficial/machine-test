import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesCardComponent } from './profiles-card.component';

describe('ProfilesCardComponent', () => {
  let component: ProfilesCardComponent;
  let fixture: ComponentFixture<ProfilesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
