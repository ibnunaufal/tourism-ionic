import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
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
    private modalController: ModalController,
    private storage: Storage,
    private alert: AlertService,
    private alertController: AlertController,
    private router: Router
  ) {
    // this.arr = this.navParams.get('data');
    this.getBookmark()
    console.log(this.arr)
   }

  ngOnInit(
  ) {
  }

  search(){
    this.router.navigate(['/tabs/search'])
  }

  getBookmark(){
    this.arr = []
    this.storage.get('fav').then((res)=>{
      this.arr = res
    })
  }

  ionViewWillEnter(){
    console.log('will enter')
  }
  ionViewDidEnter(){
    console.log('did enter')
    this.getBookmark();
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

  async presentDelete(id, name) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Anda yakin akan menghapus '+name+' dari bookmark?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Hapus',
          handler: () => {
            console.log('Confirm Okay');
            this.remove(id)
          }
        }
      ]
    });
  
    await alert.present();
  }
}
