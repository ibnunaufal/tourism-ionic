import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private modalController: ModalController
  ) {
   }

  ngOnInit(
  ) {
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
