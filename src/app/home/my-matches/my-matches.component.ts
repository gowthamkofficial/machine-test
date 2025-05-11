import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatrimonyProfile } from 'src/app/core/models/profiles.model';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent implements OnInit, AfterViewInit {


  suggestedProfiles: MatrimonyProfile[] = []
  constructor(
    public service: ProfileService,
    private loader: LoaderService,

  ) {
    this.setBreakpoint(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.setBreakpoint(width);
  }

  currentBreakpoint;
  slidesPerView
  setBreakpoint(width: number) {
    if (width < 576) {
      this.currentBreakpoint = 'xs';
      this.slidesPerView = '1';
    } else if (width >= 576 && width < 768) {
      this.currentBreakpoint = 'sm';
      this.slidesPerView = '2';
    } else if (width >= 768 && width < 992) {
      this.currentBreakpoint = 'md';
      this.slidesPerView = '2';
    } else if (width >= 992 && width < 1200) {
      this.currentBreakpoint = 'lg';
      this.slidesPerView = '4';
    } else {
      this.currentBreakpoint = 'xl';
      this.slidesPerView = '4';



    }

  }

  ngAfterViewInit(): void {
   
  }


  ngOnInit(): void {
    this.getAllSuggestedProfiles()
  }


  getAllSuggestedProfiles() {
    this.loader.open()
    this.service.getSuggestedProfiles().subscribe((res: MatrimonyProfile[]) => {
      this.suggestedProfiles = res;
      setTimeout(() => {
        this.loader.close()
      }, 1500);
    })
  }






}
