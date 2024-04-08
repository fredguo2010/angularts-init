import { PageHeaderModule } from '@delon/abc/page-header';
import { ResultModule } from '@delon/abc/result';
import { SEModule } from '@delon/abc/se';
import { STModule } from '@delon/abc/st';
import { SVModule } from '@delon/abc/sv';
import { G2CustomModule } from '@delon/chart/custom';
import { CurrencyPipeModule } from '@delon/util/pipes/currency';
export const SHARED_DELON_MODULES = [PageHeaderModule, STModule, SEModule, SVModule, CurrencyPipeModule, G2CustomModule, ResultModule];
