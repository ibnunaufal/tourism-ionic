import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  @ViewChild(IonContent) content: IonContent;
  
  isLoading = false
  start = 1;
  limit = 5;
  arr;
  kata;
  tag;
  tags;
  apiUrl = environment.API_URL;
  backToTop = false;
  opts = {
    slidesPerView: 'auto'
  };
  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private alert: AlertService,
    private platform: Platform
  ) {
    this.getData(this.start, this.limit);
    this.getAllTags();
  }

  ngOnInit() {
  }

  getAllTags(){
    this.dataService.getTags().then((res:any)=>{
      console.log(res);
      this.tags = res.body;
    })
  }

  search(kata){
    this.start = 1;
    this.kata = kata
    console.log(this.kata);
    this.isLoading = true
    this.arr = [];
    this.dataService
      .getPage(this.start, this.limit, this.kata, )
      .then((response: any) => {
        this.isLoading = false
        console.log(response);
        this.arr = response.body.data;
        console.log(this.arr)
      })
      .catch((error) => {
        this.isLoading = false
        this.alert.toastError(error);
      });
  }

  getData(start, limit) {
    this.isLoading = true
    this.arr = [];
    this.dataService
      .getPage(start, limit, this.kata, this.tag)
      .then((response: any) => {
        this.isLoading = false
        console.log(response);
        this.arr = response.body.data;
        console.log(this.arr)
      })
      .catch((error) => {
        this.isLoading = false
        this.alert.toastError(error);
      });
  }

  loadData(event) {
    this.start += 1;

    this.dataService.getPage(this.start, this.limit, this.kata, this.tag).then(
      (response: any) => {
        for (let ii = 0; ii < response.body.data.length; ii++) {
          this.arr.push(response.body.data[ii]);
        }
        if (response.body.data.length < this.limit) {
          event.target.disabled = true;
        } else {
          event.target.complete();
        }
      },
      (error) => {
        this.alert.alert(error);
      }
    );
  }

  doRefresh(event) {
    
    this.arr = [];
    this.isLoading = true

    this.start = 1;

    this.infiniteScroll.disabled = false;

    this.dataService
      .getPage(this.start, this.limit, this.kata, this.tag)
      .then((response: any) => {
        this.isLoading = false
        this.arr = response.body.data;

        event.target.complete();
      })
      .catch((error) => {
        this.isLoading = false
        this.alert.toastError(error);

        event.target.complete();
      });
  }
  
  sanitizeImg(url){
    let s = this.apiUrl + 'img/tempat/' + url
    return s
  }

  capitalize(string){
    let temp = String(string).toLowerCase();
    const words = temp.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

  async openDetail(x) {
    const modal = await this.modalController.create({
    component: DetailPage,
    componentProps: { data: x }
    });
    await modal.present();
  }

  getScrollPos(pos: number) {
    console.log(pos)
    if (pos > this.platform.height()) {
         this.backToTop = true;
    } else {
         this.backToTop = false;
    }
  }

  gotToTop() {
    this.content.scrollToTop(1000);
  }

  set(tag){
    if(tag == this.tag){
      this.tag = ""
    }else{
      this.tag = tag
    }
    this.start = 1;
    this.getData(this.start, this.limit)
    
  }
}
