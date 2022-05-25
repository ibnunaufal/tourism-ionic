
import { Component, ViewChildren, QueryList, ViewChild } from "@angular/core";



import {
  Platform,
  IonRouterOutlet,
  ModalController,
} from "@ionic/angular";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { AlertService } from "./services/alert.service";
import { Location } from "@angular/common";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private router: Router,
    private alert: AlertService,
    private location: Location,
  ) {
    this.backButtonEvent()
  }

  backButtonEvent() {
    console.log(this.router.url)
    this.platform.backButton.subscribeWithPriority(999, async () => {
      this.backButtonAlert()
      // const modal = await this.modalController.getTop();
      // if (modal) {
      //     modal.dismiss();
      //     console.log(this.router.url + ":asd")
      // }else{
      //   if (!this.routerOutlet.canGoBack()) {
      //     if (this.router.url === "/home") {
      //       this.backButtonAlert()
      //     } else if (this.router.url === "/") {
      //       this.backButtonAlert()
      //     } else if (this.router.url === "/login") {
      //       navigator["app"].exitApp();
      //     } else {
      //       this.location.back()
      //     }
      //   } else {
      //     this.location.back()
      //   } 
      // }
    })
  }


  async backButtonAlert() {
    if (
      new Date().getTime() - this.lastTimeBackPress <
      this.timePeriodToExit
    ) {
      navigator["app"].exitApp();
    } else {
      this.alert.toast("Tekan tombol kembali sekali lagi untuk keluar.");

      this.lastTimeBackPress = new Date().getTime();
    }
  }

}
