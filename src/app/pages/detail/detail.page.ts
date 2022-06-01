import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage-angular';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  arr;
  imgArr;
  isLoading;
  reviews;
  profile;
  isSaved = false;
  apiUrl = environment.API_URL
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private dataService: DataService,
    private domSanitizer: DomSanitizer,
    private storage: Storage,
    private router: Router,
    private alert: AlertService,
    private loading: LoadingService,
    private alertController: AlertController
  ) {
    this.arr = this.navParams.get('data');
    this.getImage()
    this.getReview()
    this.getProfile();
    this.saved()
    console.log(this.arr)
   }

  ngOnInit(
  ) {
  }

  capitalize(string){
    let temp = String(string).toLowerCase();
    const words = temp.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

  dismiss(){
    this.modalController.dismiss();
  }

  maps(){
    
  }

  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    let result = (match && match[2].length === 11) ? match[2] : null
    let sanitize = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+result)

    console.log(sanitize)
    return sanitize;
  }

  getProfile(){
    this.storage.get('data').then((res:any) => {
      this.profile = res
    })
  }

  getImage(){
    this.isLoading = true;
    this.dataService.getAllImage(this.arr.id).then((res:any) => {
      this.isLoading = false
      console.log(res)
      this.imgArr = res.body
    }).catch((err)=>{
      this.isLoading = false
      console.log(err)
      this.alert.toastError("Gagal mengambil gambar "+err)
    })
  }

  sanitizeImg(url){
    let s = this.apiUrl + 'img/tempat/' + url
    return s
    // return this.domSanitizer.bypassSecurityTrustUrl(s)
  }

  getTags(string){
    let temp = string.replace(" ","")
    const words = temp.split(",");
    return words
  }

  getReview(){
    this.dataService.getAllReview(this.arr.id).then((res:any) => {
      console.log(res)
      this.reviews = res.body
    }).catch((err)=>{
      console.log(err)
    })
  }
  async presentAlertReview(name) {
    if(this.profile){
      const alert = await this.alertController.create({
        header: 'Tambahkan Review',
        mode: 'ios',
        message: 'Masukkan review dan nilai untuk '+name,
        inputs: [
          {
            type: 'textarea',
            name: 'message',
            placeholder: 'Masukkan Review'
          },
          {
            type: 'number',
            name: 'vote',
            placeholder: 'Masukkan Nilai 1-10'
          }
        ],
        buttons: [
          {
            text: 'Batal',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Tambah',
            handler: (alert) => {
              let data = {
                name: this.profile.name,
                email: this.profile.email,
                id: this.arr.id,
                message: alert.message,
                vote: alert.vote
              }
              this.loading.show()
              this.dataService.reviewstore(data).then((res:any)=>{
                this.loading.hide()
                this.alert.toastSuccess("Berhasil menambah review")
                this.getReview()
              }).catch((err) => {
                this.loading.hide()
                this.alert.toastError(err);
              })
              console.log('Confirm Okay '+alert);
            }
          }
        ]
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: 'Tambah Review',
        mode: 'ios',
        message: 'Anda harus login untuk menambahkan review',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Login',
            handler: () => {
              this.router.navigate(['/auth']);
              console.log('Confirm Okay');
            }
          }
        ]
      });
      alert.onDidDismiss().then((res) => {
        if(!this.profile){
          this.modalController.dismiss()
        }
      })
      await alert.present();
      
    }
  }

  saved(){
    this.storage.get("fav").then((res:any)=>{
      if(res){
        for(let x of res){
          if(x.id == this.arr.id){
            this.isSaved = true
          }
        }
      }else{
        this.isSaved = false
      }
    }).catch((err) => {
      this.isSaved = false
    })
  }

  save(bool){
    if(bool){
      this.storage.get("fav").then((res:any)=>{
        if(res){
          let fav = res
          fav.push(this.arr)
          this.storage.set("fav", fav)
        }else{
          let fav = []
          fav.push(this.arr)
          this.storage.set("fav", fav)
        }
        this.isSaved = true
      })
      this.alert.toastSuccess("Tersimpan di Bookmark")
    }else{
      this.storage.get("fav").then((res:any)=>{
        if(res){
          let fav = res
          for (var i = 0; i < fav.length; i++) {
            if (fav[i].id === this.arr.id) {
                var spliced = fav.splice(i, 1);
                console.log("Removed element: " + spliced + "<br>");
                console.log("Remaining elements: " + fav);
              }
          }
          this.storage.set("fav", fav)
        }
        this.isSaved = false
      })
      this.alert.toastError("Terhapus dari Bookmark")
    }
  }
}
