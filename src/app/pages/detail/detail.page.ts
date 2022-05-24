import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  arr
  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.arr = this.navParams.get('data');
    console.log(this.arr)
   }

  ngOnInit(
  ) {
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
