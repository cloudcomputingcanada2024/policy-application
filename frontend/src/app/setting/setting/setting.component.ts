import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent {
  
  meetingDuration: number = 0;

  meetingDecide: any = null
  constructor() {}

  podcastingMeeting = interval(3000);
  handleStartMeeting = () => {
    this.meetingDecide = this.podcastingMeeting.subscribe((res) => {
      this.meetingDuration = res;
    });
  };
  handleCancelMeeting = () => {
    this.meetingDecide.unsubscribe();
  };
}
