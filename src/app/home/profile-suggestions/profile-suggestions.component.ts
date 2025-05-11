import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatrimonyProfile } from 'src/app/core/models/profiles.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ProfileService } from '../profile.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import swiper from 'swiper';

@Component({
  selector: 'app-profile-suggestions',
  templateUrl: './profile-suggestions.component.html',
  styleUrls: ['./profile-suggestions.component.scss']
})
export class ProfileSuggestionsComponent implements OnInit, AfterViewInit {

  suggestedProfiles: MatrimonyProfile[] = [];
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  constructor(
    private profileService: ProfileService,
    private loader: LoaderService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.getAllSuggestedProfiles()

  }



  index = 0;

  // Swiper
  swiperConfig: SwiperOptions = {
    effect: 'cards',
    grabCursor: true,
    cardsEffect: {
      perSlideOffset: 2,
    }
  };



  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.index;
    const swiperEl = document.querySelector('swiper-container');
    const swiperParams = {
      effect: 'cards',
      grabCursor: true,
      cardsEffect: {
        perSlideOffset: 10,
        perSlideRotate: 0,
        slideShadows: false
      },

    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();


    swiperEl.addEventListener('swiperslidechange', (event: any) => {
      console.log(event?.detail[0]);

      if (event?.detail[0]?.swipeDirection == 'next') {
        let previousIndex = event?.detail[0]?.previousIndex;
        let realIndex = event?.detail[0]?.realIndex;
        let profile = this.suggestedProfiles[previousIndex];
        if (profile.status.interested == true || profile.status.shortListed == true) {


        } else {
          this.alertService.showAlert('Not-Interested', `You are not interested on ${profile?.name}!`, {
            allowClose: true,
            showCancel: true,
            image: 'assets/illustration/not-ok.jpg'
          }).subscribe((res) => {
            if (res) {
              this.suggestedProfiles.splice(previousIndex, 1);
              swiperEl.swiper.activeIndex = previousIndex;
            }
            else {

            }
          });
        }


      }

    });



  }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }



  getAllSuggestedProfiles() {
    this.loader.open()
    this.profileService.getSuggestedProfiles().subscribe((res: MatrimonyProfile[]) => {
      console.log(res);
      this.suggestedProfiles = res;
      setTimeout(() => {
        this.loader.close()
      }, 1500);
    })
  }


  profileAction(event, i) {
    const swiperEl = document.querySelector('swiper-container');
    switch (event?.action) {

      case 'shortList': {

        if (this.suggestedProfiles[i].status.shortListed == false) {
          this.alertService.showAlert('Shortlisted', `You have shortlisted ${event?.profile?.name}!`, { allowClose: true, image: 'assets/illustration/shortlisted.jpg' }).subscribe((res) => {

            if (this.suggestedProfiles[i].status.shortListed == false) {
              this.suggestedProfiles[i] = {
                ...this.suggestedProfiles[i],
                status: {
                  ...this.suggestedProfiles[i].status,
                  shortListed: true,
                  interested: true
                }
              };
            }
            this.cdr.detectChanges();
            swiperEl.swiper.slideNext();
            this.profileService.addMyMatches(this.suggestedProfiles[i]).subscribe((res) => {
              console.log(res);
            })

          })
        } else {
          this.suggestedProfiles[i] = {
            ...this.suggestedProfiles[i],
            status: {
              ...this.suggestedProfiles[i].status,
              shortListed: false,
              interested: false
            }
          };
          this.profileService.removeFromMyMatch(this.suggestedProfiles[i]).subscribe((res) => {
            console.log(res);
          })
        }

      }
        break
      case 'not-interested': {

        this.alertService.showAlert('Not-Interested', `You are not interested on ${event?.profile?.name}!`, {
          allowClose: true,
          showCancel: true,
          image: 'assets/illustration/not-ok.jpg'
        }).subscribe((res) => {
          console.log(res);
          if (res == true) {
            this.suggestedProfiles.splice(i, 1);
            swiperEl.swiper.activeIndex = 0;
            swiperEl.swiper.slideNext();
          }
          else {
            return
          }

        })
      }
        break

      case 'interested': {

        if (this.suggestedProfiles[i].status.interested == false) {
          this.alertService.showAlert('Interested', `You have shown interest on ${event?.profile?.name}!`,
            { allowClose: true, image: 'assets/illustration/ok.jpg' }).subscribe((res) => {
              this.suggestedProfiles[i] = {
                ...this.suggestedProfiles[i],
                status: {
                  ...this.suggestedProfiles[i].status,
                  interested: true
                }
              }
              swiperEl.swiper.slideNext();
                   this.profileService.addMyMatches(this.suggestedProfiles[i]).subscribe((res) => {
              console.log(res);
            })
            })
        } else {
          this.suggestedProfiles[i] = {
            ...this.suggestedProfiles[i],
            status: {
              ...this.suggestedProfiles[i].status,
              interested: false
            }
          };
               this.profileService.removeFromMyMatch(this.suggestedProfiles[i]).subscribe((res) => {
              console.log(res);
            })
        }

      }
    }


  }

}
