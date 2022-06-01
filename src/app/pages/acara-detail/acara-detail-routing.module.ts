import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcaraDetailPage } from './acara-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AcaraDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcaraDetailPageRoutingModule {}
