import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController: LoadingController
  ) { }

  show() {
    this.loadingController
      .create({
        message: "Mohon menunggu..",
        backdropDismiss: true
      })
      .then(res => {
        res.present();
      });
  }

  hide(){
    this.loadingController.dismiss()
  }

}
