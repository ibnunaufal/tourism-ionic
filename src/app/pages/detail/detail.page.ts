import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  arr;
  imgArr;
  isLoading;
  isSaved = false;
  apiUrl = environment.API_URL
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private dataService: DataService,
    private domSanitizer: DomSanitizer,
    private storage: Storage,
    private alert: AlertService
  ) {
    this.arr = this.navParams.get('data');
    this.getImage()
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
