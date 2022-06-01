import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  countBookmarks = 0;
  countReview = 0;
  name = "Nama Pengunjung";
  email = "email@pengunjung.com";
  isLogin = false;
  constructor(
    private modalController: ModalController,
    private storage: Storage,
    private dataService: DataService,
    private alertController: AlertController,
    private router: Router
  ) {
    
   }

  ngOnInit(
  ) {
  }

  ionViewDidEnter(){
    console.log('did enter')
    this.getInit()
  }
  getInit(){
    this.getCountBookmark()
    this.storage.get('data').then((res:any) => {
      if(res){
        this.isLogin = true;
        this.name = res.name;
        this.email = res.email;
        this.getCountReview()
      }
    })
  }

  getCountBookmark(){
    this.storage.get('fav').then((res:any)=>{
      this.countBookmarks = res.length
    })
  }

  getCountReview(){
    this.storage.get('data').then((res:any) => {
      if(res.email){
        this.dataService.countBookmark(res.email).then((res:any) => {
          this.countReview = res.body.length
        })
      }
    })
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async presentLogout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Anda yakin akan logout?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Logout',
          handler: () => {
            console.log('Confirm Okay');
            this.storage.remove('data');
            this.isLogin = false;
          }
        }
      ]
    });
  
    await alert.present();
  }

  goLogin(){
    this.router.navigate(['/auth'])
  }
}
