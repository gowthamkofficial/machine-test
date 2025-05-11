import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatrimonyProfile } from 'src/app/core/models/profiles.model';

@Component({
  selector: 'app-profiles-card',
  templateUrl: './profiles-card.component.html',
  styleUrls: ['./profiles-card.component.css']
})
export class ProfilesCardComponent implements OnChanges {




  constructor(
    private router :Router
  ){}
  @Input() profile!: MatrimonyProfile;
  @Output() cardAction: EventEmitter<any> = new EventEmitter()

  ngOnChanges(changes: SimpleChanges): void {

  }
  isFlipped = false;

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }


  emitEvent(action: 'shortList' | 'not-interested' | 'interested') {
    this.cardAction.emit({ action, profile: this.profile })
  }

  navigateToView(){
    this.router.navigate([`profile-view/${this.profile.id}`])
  }

}
