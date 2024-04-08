import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BigdataCategorybuilderComponent } from './categorybuilder/categorybuilder.component';
import { BigdataCategoryinputComponent } from './categoryinput/categoryinput.component';
import { BigdataCategorytuningComponent } from './categorytuning/categorytuning.component';
import { BigdataHomeComponent } from './home/home.component';
import { BigdataRegressioninputComponent } from './regressioninput/regressioninput.component';

const routes: Routes = [
  { path: '', component: BigdataHomeComponent, data: { title: 'BIG DATA TOOL' } },
  { path: 'home', component: BigdataHomeComponent, data: { title: 'BIG DATA TOOL' } },
  { path: 'categoryinput', component: BigdataCategoryinputComponent, data: { title: 'BIG DATA TOOL- 分类模型' } },
  { path: 'categorybuilder', component: BigdataCategorybuilderComponent, data: { title: 'BIG DATA TOOL- 分类模型' } },
  { path: 'categorytuning', component: BigdataCategorytuningComponent, data: { title: 'BIG DATA TOOL- 分类模型' } },
  { path: 'regressioninput', component: BigdataRegressioninputComponent, data: { title: 'BIG DATA TOOL- 回归模型' } },
  { path: 'regressionbuilder', component: BigdataCategorybuilderComponent, data: { title: 'BIG DATA TOOL- 回归模型' } },
  { path: 'regressiontuning', component: BigdataCategorytuningComponent, data: { title: 'BIG DATA TOOL- 回归模型' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BigdataRoutingModule {}
