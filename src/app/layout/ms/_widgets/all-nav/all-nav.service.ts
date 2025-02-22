import { Inject, Injectable } from '@angular/core';
import { I18NService } from '@core';
import { ALAIN_I18N_TOKEN, _HttpClient } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { MSLink } from '../../ms.interfaces';

export interface MSAllNavData {
  nav?: MSAllNav[];
  navBottom?: MSAllNavItem[];
  bottomText?: string;
}

export interface MSAllNav extends MSAllNavItem {
  /**
   * 二级菜单
   * - 若指定则 `left`、`right` 失效
   * - 最多只支持一层
   */
  children?: MSAllNav[];
  /**
   * 左边分类
   */
  left?: MSAllNavCategory[];
  /**
   * 左边分类栏数，默认：`4`
   */
  leftColumn?: number;
  /**
   * 分栏后的左边分类，用于渲染
   */
  _left?: MSAllNavCategoryColumn[];
  /**
   * 右边分类
   */
  right?: MSAllNavCategory[];

  level?: number;
  parent?: MSAllNav;
  active?: boolean;
}

export interface MSAllNavCategory {
  text: string;
  list?: MSAllNavItem[];
}

export interface MSAllNavCategoryColumn {
  list: MSAllNavCategory[];
  count: number;
  idx: number;
}

export interface MSAllNavItem extends MSLink {
  text?: string;
  /** 提醒标识，红色字眼，例如：HOT,NEW */
  tip?: string;
}

/**
 * 顶部菜单所有菜单数据，几个注意点：
 * - 当前处理的数据源格式为 `./assets/tmp/all-nav-en-US.json`
 * - 最终处理数据以 `all-nav.interface.ts` 系列接口为准
 */
@Injectable({ providedIn: 'root' })
export class MSAllNavService {
  private _data!: MSAllNavData;

  get allL2(): MSAllNav[] {
    return this._data.nav!.filter(w => w.children && w.children.length > 0);
  }

  get allPanel(): MSAllNav[] {
    return this._data.nav!.reduce((p: MSAllNav[], c: MSAllNav) => (p = p.concat(c.children ? c.children : c)), []);
  }

  getData(): Observable<MSAllNavData> {
    return this._data ? of(this._data) : this.getByHttp();
  }

  constructor(private http: _HttpClient, private arrSrv: ArrayService, @Inject(ALAIN_I18N_TOKEN) private i18nSrv: I18NService) {}

  private fixData(data: MSAllNavData): MSAllNavData {
    const splitColumn = (item: MSAllNav) => {
      if (!item.left) {
        return;
      }
      item.leftColumn = item.leftColumn || 4;
      const columns: MSAllNavCategoryColumn[] = new Array(item.leftColumn).fill({}).map((_, idx) => ({
        list: [],
        count: 0,
        idx
      }));
      item.left
        .filter(w => w.list)
        .forEach(category => {
          const idx = [...columns].sort((a, b) => a.count - b.count)[0].idx;
          columns[idx].list.push(category);
          columns[idx].count += category.list!.length;
        });
      item._left = columns;
    };
    data.nav!.forEach(p1 => {
      p1.level = 1;
      if (p1.children) {
        p1.children.forEach(p2 => {
          p2.parent = p1;
          p2.level = 2;
          splitColumn(p2);
        });
      } else {
        splitColumn(p1);
      }
    });
    return data;
  }

  private getByHttp(): Observable<MSAllNavData> {
    return this.http.get(`./assets/tmp/all-nav-${this.i18nSrv.currentLang}.json`).pipe(
      map((res: any) => {
        this._data = this.fixData(res);
        return this._data;
      })
    );
  }

  refreshActive(i: MSAllNav): void {
    this.arrSrv.visitTree(this._data.nav!, (item: MSAllNav) => {
      item.active = false;
    });
    while (i) {
      i.active = true;
      i = i.parent!;
    }
  }
}
