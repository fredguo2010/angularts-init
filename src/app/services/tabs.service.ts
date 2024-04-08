import { Injectable } from '@angular/core';
import { MenuService } from '@delon/theme';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  tabsArray$ = new ReplaySubject(1);
  currentTab$ = new ReplaySubject(1);
  selectedIndex$ = new ReplaySubject(1);
  currentTab: any = {};
  tabsArray: any = [];
  breadArr: any = [];

  constructor(private menuService: MenuService) {
    this.afterMenuChange();
  }

  setTab(tabArray: any) {
    this.tabsArray$.next(tabArray);
  }

  setCurrentTab(tab: any) {
    this.currentTab$.next(tab);
  }

  setSelectedIndex(tabIndex: any) {
    this.selectedIndex$.next(tabIndex);
  }

  findSelectNode(data: any) {
    // 递归找到面包屑select
    if (data._selected) {
      this.breadArr.push(data);
    }
    if (data.children) {
      data.children.forEach((item: any) => {
        if (item._selected) {
          this.findSelectNode(item);
        }
      });
    }
    return this.breadArr;
  }

  transeToTabObj(data: any) {
    let first = data[1]?.text;
    let end = data[2]?.text;
    let link = data[2]?.link;
    if (data[2]?.text) {
      return {
        title: `${first}-${end}`,
        url: link
      };
    } else {
      return '';
    }
  }

  afterMenuChange() {
    this.menuService.change.subscribe((res: any) => {
      // menu 变化
      this.breadArr = [];
      this.breadArr = this.findSelectNode(res[0]);
      if (this.breadArr.length > 2) {
        this.currentTab = this.transeToTabObj(this.breadArr);
        this.setCurrentTab(this.currentTab);
        let isHaveTab = false;
        this.tabsArray.forEach((tab: any, index: number) => {
          if (tab?.url === this.currentTab?.url && tab?.label === this.currentTab?.label) {
            isHaveTab = true;
            this.setSelectedIndex(index);
          }
        });
        if (!isHaveTab) {
          // 如果没有 再添加
          this.tabsArray.push(this.currentTab);
          this.setSelectedIndex(this.tabsArray.length - 1);
          this.setTab(this.tabsArray);
        }
      } else {
        this.setTab([]);
      }
    });
  }
}
