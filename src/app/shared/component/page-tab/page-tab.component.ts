import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'page-tab',
  templateUrl: './page-tab.component.html',
  styles: []
})
export class PageTabComponent {
  tabs: any = [];
  currentTab: any = {};
  selectedIndex: any = 0;
  constructor(private tabsService: TabsService, private router: Router) {
    this.tabsService.tabsArray$.subscribe((res: any) => {
      this.tabs = res;
    });
    this.tabsService.currentTab$.subscribe(res => {
      // 监听当前 激活tab. 与tab 交互
      this.currentTab = res;
      this.tabsService.selectedIndex$.subscribe(res => {
        this.selectedIndex = res;
      });
    });
  }

  closeTab({ index }: { index: number }): void {
    if (index == 0 && this.tabs.length === 1) {
      this.router.navigate(['dashboard/main']);
      this.tabsService.setTab([]);
    } else {
      if (index == this.tabs.length - 1 && this.selectedIndex === this.tabs.length - 1) {
        this.router.navigate([this.tabs[this.tabs.length - 2].url]);
      } else if (index == this.selectedIndex) {
        if (index === 0 && this.selectedIndex === 0) {
          this.router.navigate([this.tabs[1].url]);
        } else {
          this.router.navigate([this.tabs[index + 1].url]);
        }
      }
    }
    this.tabs.splice(index, 1);
  }

  jumpPage(url: any) {
    this.router.navigate([url]);
  }
}
