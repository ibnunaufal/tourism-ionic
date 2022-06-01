import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isRegistered = false;
  name;
  email;
  password;
  constructor(
    private loadingController: LoadingController,
    private dataService: DataService,
    private alertController: AlertController,
    private router: Router,
    private loading: LoadingService,
    private storage: Storage
  ) { }

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
    console.log('df')
    if(this.isRegistered){
      // login
      console.log('asa')
      let d = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      this.loading.show()
      this.dataService.register(d).then((res:any) =>{
        this.loading.hide()
        console.log(res)
      }).catch((err) => {
        this.loading.hide()
        console.log(err)
      })
    }else{
      //register
      console.log('as')
      let d = {
        email: this.email,
        password: this.password,
      }
      this.loading.show()
      this.dataService.login(d).then((res:any) =>{
        this.loading.hide()
        console.log(res)
        this.storage.set('data',res.body.data[0]).then(() => {
          this.router.navigate(['/tabs/profile'])
        })
      }).catch((err) => {
        this.loading.hide()
        console.log(err)
      })
    }
  }
  async presentAlertReset() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      mode: 'ios',
      message: 'Dengan ini anda akan mengirim link reset password melalui email',
      inputs: [
        {
          name: 'emailreset',
          placeholder: 'Masukkan email anda',
          type: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Kirim',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  
    await alert.present();
  }
}
