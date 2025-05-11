import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, AfterViewInit {
  profile: any;
  profileId

  constructor(
    private service: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.params.subscribe((res: any) => {
      this.profileId = res?.id;
      this.getOneProfile()
    })
  }

  ngOnInit(): void {

  }


  getOneProfile() {
    this.service.getProfileById(this.profileId).subscribe((res) => {
      this.profile = res
    })
  }

  ngAfterViewInit(): void {
    var swiper2El: any = document.querySelector("mySwiper2");
    Object.assign(swiper2El, {
      grabCursor: true,
      effect: "creative",
      loop: true,
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: true,
          translate: ["120%", 0, -500],
        },
      },
    });
    swiper2El.initialize()
  }
}