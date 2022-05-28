import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { BookmarkPage } from '../pages/bookmark/bookmark.page';
import { CategoryPage } from '../pages/category/category.page';
import { DetailPage } from '../pages/detail/detail.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { SearchPage } from '../pages/search/search.page';
import { AlertService } from '../services/alert.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('sliderHeadline', { static: false }) sliderHeadline: IonSlides;
  headlineOpts = {
    slidesPerView: 1,
    loop: true,
    autoPlay: true,
    speed: 400
  };

  
  apiUrl = environment.API_URL;
  acara;
  headline;
  tempat;
  categories;
  isLoading = false;
  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    private alert: AlertService,
    private router: Router
  ) {
    this.getInit()
  }

  start(){
    this.sliderHeadline.startAutoplay();
  }

  getInit(){
    this.isLoading = true
    this.dataService.getHeadline().then((res:any) => {
      console.log(res)
      this.isLoading = false;
      this.acara = res.body.event;
      this.headline = res.body.headline;
      this.tempat = res.body.tempat;
      this.categories = res.body.category;
    }).catch((err) => {
      this.isLoading = true;
      this.alert.toastError(err)
    })
  }

  capitalize(string){
    let temp = String(string).toLowerCase();
    const words = temp.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

  doRefresh(event){
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getInit();
      event.target.complete();
    }, 2000);
  }


  async openDetail(x) {
    const modal = await this.modalController.create({
    component: DetailPage,
    componentProps: { data: x }
    });
    await modal.present();
  }


  async openBookmark() {
    const modal = await this.modalController.create({
    component: BookmarkPage,
    componentProps: { 
      // data: this.listWisata 
    }
    });
    await modal.present();
  }

  async openCategory(category) {
    const modal = await this.modalController.create({
    component: CategoryPage,
    componentProps: { 
      // data: this.listWisata,
      category: category 
    }
    });
    await modal.present();
  }
  async openProfile() {
    const modal = await this.modalController.create({
    component: ProfilePage,
    componentProps: { data: "" }
    });
    await modal.present();
  }

  showAll(){
    this.router.navigate(['/search'])
  }
}
