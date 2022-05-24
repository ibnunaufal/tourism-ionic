import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {

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
  async openDetail(x) {
    const modal = await this.modalController.create({
    component: DetailPage,
    componentProps: { data: x }
    });
    await modal.present();
  }
}
