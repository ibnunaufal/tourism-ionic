import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcaraDetailPageRoutingModule } from './acara-detail-routing.module';

import { AcaraDetailPage } from './acara-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcaraDetailPageRoutingModule
  ],
  declarations: [AcaraDetailPage]
})
export class AcaraDetailPageModule {}
