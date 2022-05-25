import { Injectable } from "@angular/core";
import { ToastController, AlertController, PopoverController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  async alert(message: any) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: message,
      buttons: ["OK"],
      mode: 'ios'
    });

    await alert.present();
  }

  async toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
      mode: 'ios'
    });

    await toast.present();
  }

  async toastSuccess(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom",
      color: "success",
      mode: 'ios'
    });

    await toast.present();
  }

  async toastError(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "bottom",
      color: "danger",
      mode: 'ios'
    });

    await toast.present();
  }
}
