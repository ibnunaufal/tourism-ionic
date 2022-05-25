import { Component, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { BookmarkPage } from '../pages/bookmark/bookmark.page';
import { CategoryPage } from '../pages/category/category.page';
import { DetailPage } from '../pages/detail/detail.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { SearchPage } from '../pages/search/search.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  @ViewChild('sliderHeadline', { static: false }) sliderHeadline: IonSlides;
  slideOpts = {
    slidesPerView: 1.5,
    loop: false,
    spaceBetween: 0,
    autoPlay: false,
    speed: 400
  };
  listKategori = [
    {
      name: "Destinasi",
      desc: "Jelajai destinasi menarik di kota ini",
      icon: "map-outline"
    },
    {
      name: "Akomodasi",
      desc: "Jelajai akomodasi menarik di kota ini",
      icon: "bed-outline"
    },
    {
      name: "Kuliner",
      desc: "Jelajai kuliner menarik di kota ini",
      icon: "fast-food-outline"
    },
    {
      name: "Acara",
      desc: "Jelajai acara menarik di kota ini",
      icon: "aperture-outline"
    },
    {
      name: "Fasilitas Umum",
      desc: "Manfaatkan fasilitas umum di kota ini",
      icon: "bus-outline"
    }
  ]
  listWisata = [
    {
      name: "Pohon Pengantin",
      img: "../../assets/pengantin.jpg",
      alamat: "Sidorejo, Salatiga",
      desc: "Tempat indah nun jauh disana, menarik dan menyenangkan. Sejuk alami indah"
    },
    {
      name: "Tamansari",
      img: "../../assets/tamansari.jpg",
      alamat: "Tamansari, Salatiga",
      desc: "Tempat indah nun jauh disana, menarik dan menyenangkan. Sejuk alami indah"
    },
    {
      name: "Selasar Kartini",
      img: "../../assets/kartini.jpg",
      alamat: "Salatiga, Salatiga",
      desc: "Tempat indah nun jauh disana, menarik dan menyenangkan. Sejuk alami indah"
    },
    {
      name: "Salib Putih",
      img: "../../assets/salib.jpg",
      alamat: "Argomulyo, Salatiga",
      desc: "Tempat indah nun jauh disana, menarik dan menyenangkan. Sejuk alami indah"
    }
  ]
  constructor(
    private modalController: ModalController
  ) {
    console.log(this.listWisata[0])
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
    componentProps: { data: this.listWisata }
    });
    await modal.present();
  }

  async openCategory(category) {
    const modal = await this.modalController.create({
    component: CategoryPage,
    componentProps: { 
      data: this.listWisata,
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
}
