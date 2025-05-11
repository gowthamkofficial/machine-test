import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSuggestionsComponent } from './profile-suggestions.component';

describe('ProfileSuggestionsComponent', () => {
  let component: ProfileSuggestionsComponent;
  let fixture: ComponentFixture<ProfileSuggestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSuggestionsComponent]
    });
    fixture = TestBed.createComponent(ProfileSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
