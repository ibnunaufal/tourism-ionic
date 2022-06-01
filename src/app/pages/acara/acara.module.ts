import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcaraPageRoutingModule } from './acara-routing.module';

import { AcaraPage } from './acara.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcaraPageRoutingModule
  ],
  declarations: [AcaraPage]
})
export class AcaraPageModule {}
