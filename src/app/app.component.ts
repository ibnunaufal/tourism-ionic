
import { Component, ViewChildren, QueryList, ViewChild } from "@angular/core";
import { Storage } from '@ionic/storage-angular';


import {
  Platform,
  IonRouterOutlet,
  ModalController,
  NavController,
  AlertController,
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
    private navCtrl: NavController,
    private alertController: AlertController,
    private storage: Storage
  ) {
    // this.initializeApp();
    // this.backButtonEvent()
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      // alert.toastSuccess('handler')
    });
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(0,async() => {
        // this.alert.toastSuccess("cek")
        if (this.modalController.getTop()) {
          const modal = await this.modalController.getTop();
          console.log(modal)
          if (modal) { 
            this.modalController.dismiss();
            return;
          }else {
            if (this.router.url=="/tabs/home" || this.router.url=="/tabs/search" || this.router.url=="/tabs/bookmark" || this.router.url=="/tabs/profile") {
              navigator['app'].exitApp();
            } else {
              this.navCtrl.pop();
            }
          }
        } else {
          if (this.router.url=="/tabs/home" || this.router.url=="/tabs/search" || this.router.url=="/tabs/bookmark" || this.router.url=="/tabs/profile") {
            navigator['app'].exitApp();
          } else {
            this.navCtrl.pop();
          }
        } 
      });
    })
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
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

  initializeApp() {

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this.location.isCurrentPathEqualTo('/tabs/home')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this.location.back();

      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });

  }

  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }

}
