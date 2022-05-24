import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isRegistered = true;

  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
  }

  changeMode(){
    if(this.isRegistered){
      this.presentLoading()
      this.isRegistered = false
    }else{
      this.presentLoading()
      this.isRegistered = true
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      duration: 250,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  submit(){
    if(this.isRegistered){
      // login
    }else{
      //register
    }
  }
}
