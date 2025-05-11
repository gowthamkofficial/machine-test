import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatrimonyProfile } from 'src/app/core/models/profiles.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ProfileService } from '../profile.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-profile-suggestions',
  templateUrl: './profile-suggestions.component.html',
  styleUrls: ['./profile-suggestions.component.scss']
})
export class ProfileSuggestionsComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  suggestedProfiles: MatrimonyProfile[] = [];
  myMatches: MatrimonyProfile[] = [];

  index = 0;
  swiperEl!: HTMLElement;
  swiperEventAttached = false;

  swiperConfig: SwiperOptions = {
    effect: 'cards',
    grabCursor: true,
    cardsEffect: {
      perSlideOffset: 2,
    }
  };

  constructor(
    private profileService: ProfileService,
    private loader: LoaderService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getAllSuggestedProfiles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initSwiper(), 0);
  }

  private initSwiper(): void {
    this.swiperEl = this.swiper.nativeElement;
    if (!this.swiperEl) return;

    const swiperParams = {
      effect: 'cards',
      grabCursor: true,
      cardsEffect: {
        perSlideOffset: 10,
        perSlideRotate: 0,
        slideShadows: false
      }
    };

    Object.assign(this.swiperEl, swiperParams);
    if (typeof (this.swiperEl as any).initialize === 'function') {
      (this.swiperEl as any).initialize();
    }

    if (!this.swiperEventAttached) {
      this.swiperEl.addEventListener('swiperslidechange', this.onSlideChange.bind(this));
      this.swiperEventAttached = true;
    }

    (this.swiperEl as any).swiper.activeIndex = this.index;
  }

  private onSlideChange(event: any): void {
    const detail = event?.detail?.[0];
    if (detail?.swipeDirection === 'next') {
      const previousIndex = detail.previousIndex;
      const profile = this.suggestedProfiles[previousIndex];

      if (!profile.status.interested && !profile.status.shortListed) {
        this.alertService.showAlert('Not-Interested', `You are not interested on ${profile?.name}!`, {
          allowClose: true,
          showCancel: true,
          image: 'assets/illustration/not-ok.jpg'
        }).subscribe((res) => {
          if (res) {
            this.suggestedProfiles.splice(previousIndex, 1);
            (this.swiperEl as any).swiper.activeIndex = previousIndex;
          }
        });
      }
    }
  }

  slideChange(swiper: any): void {
    this.index = swiper.detail[0].activeIndex;
  }

  private getAllSuggestedProfiles(): void {
    this.loader.open();
    this.profileService.getSuggestedProfiles().subscribe((res: MatrimonyProfile[]) => {
      this.suggestedProfiles = res;
      setTimeout(() => this.loader.close(), 1500);
    });
  }

  private getAllMatched(): void {
    this.profileService.showAllMyMatches().subscribe((res) => {
      this.myMatches = res?.data ?? [];
      this.suggestedProfiles = this.suggestedProfiles.map((profile) => {
        const match = this.myMatches.find(m => m.id === profile.id);
        return match ? match : profile;
      });
    });
  }

  profileAction(event: any, i: number): void {
    const swiperEl = document.querySelector('swiper-container') as any;
    const profile = this.suggestedProfiles[i];

    switch (event?.action) {
      case 'shortList':
        if (!profile.status.shortListed) {
          this.suggestedProfiles[i] = {
            ...profile,
            status: {
              ...profile.status,
              shortListed: true,
              interested: true
            }
          };
          this.toaster.success(`You have shortlisted ${event?.profile?.name}!`);
          this.cdr.detectChanges();
          swiperEl.swiper.slideNext();
          this.profileService.addMyMatches(this.suggestedProfiles[i]).subscribe();
        } else {
          this.suggestedProfiles[i] = {
            ...profile,
            status: {
              ...profile.status,
              shortListed: false,
              interested: false
            }
          };
          this.profileService.removeFromMyMatch(this.suggestedProfiles[i]).subscribe();
        }
        break;

      case 'not-interested':
        this.alertService.showAlert('Not-Interested', `You are not interested on ${event?.profile?.name}!`, {
          allowClose: true,
          showCancel: true,
          image: 'assets/illustration/not-ok.jpg'
        }).subscribe((res) => {
          if (res) {
            this.suggestedProfiles.splice(i, 1);
            swiperEl.swiper.activeIndex = i+1;
            swiperEl.swiper.slideNext();
          }
        });
        break;

      case 'interested':
        if (!profile.status.interested) {
          this.suggestedProfiles[i] = {
            ...profile,
            status: {
              ...profile.status,
              interested: true
            }
          };
          swiperEl.swiper.slideNext();
          this.profileService.addMyMatches(this.suggestedProfiles[i]).subscribe();
          this.toaster.success(`You have shown interest on ${event?.profile?.name}!`);
        } else {
          this.suggestedProfiles[i] = {
            ...profile,
            status: {
              ...profile.status,
              interested: false
            }
          };
          this.profileService.removeFromMyMatch(this.suggestedProfiles[i]).subscribe();
        }
        break;
    }
  }
}
