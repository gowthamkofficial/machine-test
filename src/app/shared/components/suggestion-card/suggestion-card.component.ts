import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatrimonyProfile } from 'src/app/core/models/profiles.model';

@Component({
  selector: 'app-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrls: ['./suggestion-card.component.css']
})
export class SuggestionCardComponent implements OnChanges {


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

}
