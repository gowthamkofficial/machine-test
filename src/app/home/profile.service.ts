import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MatrimonyProfile } from '../core/models/profiles.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private myMatches: MatrimonyProfile[] = []

  constructor(private http: HttpClient) { }
  getSuggestedProfiles(): Observable<MatrimonyProfile[]> {
    return this.http.get<MatrimonyProfile[]>('assets/responses/matrimony_profiles.json').pipe(
      map((profiles: MatrimonyProfile[]) => {
        return profiles.filter(profile =>
          !this.myMatches.some(match => match.id === profile.id)
        );
      })
    );
  }

  getProfileById(id: number): Observable<MatrimonyProfile | undefined> {
    return this.http.get<MatrimonyProfile[]>('assets/responses/matrimony_profiles.json').pipe(
      map((profiles: MatrimonyProfile[]) => profiles.find(profile => profile.id == id))
    );
  }


  addMyMatches(profile: MatrimonyProfile) {
    this.myMatches.push(profile);
    return of({
      status: true,
      message: `You have added ${profile.name} to your matches`
    })
  }

  removeFromMyMatch(profile: MatrimonyProfile) {
    const index = this.myMatches.findIndex(p => p.id === profile.id);
    if (index > -1) {
      this.myMatches.splice(index, 1);
    }
    return of({
      status: true,
      message: `You have removed ${profile.name} from your matches`
    });
  }


  showAllMyMatches() {
    return of({
      status: true,
      message: this.myMatches.length > 0 ? 'Listed your matches successfully' : 'No matches found',
      data: this.myMatches
    })
  }
}
