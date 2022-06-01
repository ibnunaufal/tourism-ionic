import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcaraPage } from './acara.page';

const routes: Routes = [
  {
    path: '',
    component: AcaraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcaraPageRoutingModule {}
