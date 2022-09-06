import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  apiUrl = environment.API_URL;
  headlines = [{
    title: "Jelajahi destinasi wisata menarik"
  },{
    title: "Nikmati beragam kuliner menarik"
  },{
    title: "Ikuti acara yang menarik"
  }]
  constructor(
    private dataService: DataService
  ) { 
    this.init()
  }

  ngOnInit() {
  }

  init(){
    this.dataService.getIntroHeadline().then((res:any) => {
      // this.headlines = res.body
    })
  }

}
