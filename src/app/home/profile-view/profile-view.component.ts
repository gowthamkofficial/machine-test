import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, AfterViewInit {
  profile: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('assets/responses/matrimony_profiles.json').subscribe(data => {
      this.profile = data.find(p => p.id === 3); // Load specific profile
    });
  }

  ngAfterViewInit(): void {
    var swiper2El: any = document.querySelector(".mySwiper2");
    Object.assign(swiper2El, {
      grabCursor: true,
      effect: "creative",
      loop:true,
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