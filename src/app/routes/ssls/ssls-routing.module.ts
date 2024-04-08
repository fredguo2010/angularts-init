import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SslsSlicesimComponent } from './slicesim/slicesim.component';

const routes: Routes = [

  { path: 'slicesim', component: SslsSlicesimComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SslsRoutingModule { }
