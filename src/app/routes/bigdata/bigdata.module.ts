import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

import { BigdataRoutingModule } from './bigdata-routing.module';
import { BigdataCategorybuilderComponent } from './categorybuilder/categorybuilder.component';
import { BigdataCategoryinputComponent } from './categoryinput/categoryinput.component';
import { BigdataCategorytuningComponent } from './categorytuning/categorytuning.component';
import { BigdataHomeComponent } from './home/home.component';
import { BigdataRegressionbuilderComponent } from './regressionbuilder/regressionbuilder.component';
import { BigdataRegressioninputComponent } from './regressioninput/regressioninput.component';
import { BigdataRegressiontuningComponent } from './regressiontuning/regressiontuning.component';

const COMPONENTS: Array<Type<void>> = [
  BigdataHomeComponent,
  BigdataCategoryinputComponent,
  BigdataCategorybuilderComponent,
  BigdataCategorytuningComponent,
  BigdataRegressioninputComponent,
  BigdataRegressionbuilderComponent,
  BigdataRegressiontuningComponent
];

@NgModule({
  imports: [SharedModule, BigdataRoutingModule, NzTimelineModule, NzBackTopModule],
  declarations: COMPONENTS
})
export class BigdataModule {}
