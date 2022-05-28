import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { DetailPage } from '../detail/detail.page';
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {

  arr;
  apiUrl = environment.API_URL;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private storage: Storage,
    private alert: AlertService
  ) {
    // this.arr = this.navParams.get('data');
    this.getBookmark()
    console.log(this.arr)
   }

  ngOnInit(
  ) {
  }

  getBookmark(){
    this.arr = []
    this.storage.get('fav').then((res)=>{
      this.arr = res
    })
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
  sanitizeImg(url){
    let s = this.apiUrl + 'img/tempat/' + url
    return s
    // return this.domSanitizer.bypassSecurityTrustUrl(s)
  }

  remove(id){
    this.storage.get("fav").then((res:any)=>{
      if(res){
        let fav = res
        for (var i = 0; i < fav.length; i++) {
          if (fav[i].id === id) {
              var spliced = fav.splice(i, 1);
              console.log("Removed element: " + spliced + "<br>");
              console.log("Remaining elements: " + fav);
            }
        }
        this.storage.set("fav", fav).then(()=>{
          this.alert.toastError("Terhapus dari Bookmark");
          this.getBookmark();
        });
      }
    })
  }
}
