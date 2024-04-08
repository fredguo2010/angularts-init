import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

import { BrandService } from '../../ms.service';
import { MSProduct, MSProductCategory, MSProductI18n, MSProductService } from '../../services/product.service';

@Component({
  selector: 'ms-sidebar',
  templateUrl: './sidebar.component.html',
  host: {
    '[class.alain-ms__sidebar]': 'true',
    '[class.alain-ms__sidebar-showproduct]': 'showProduct'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MSSidebarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('categoryEl', { static: false })
  private categoryEl!: ElementRef;

  showProduct = false;
  inited = false;

  get shortcuts(): MSProduct[] {
    return this.srv.shortcuts;
  }

  get l(): MSProductI18n {
    return this.srv.i18n;
  }

  q = '';
  searchList: MSProductCategory[][] = [];
  searchCategories: MSProductCategory[] = [];

  constructor(private brand: BrandService, private srv: MSProductService, private msg: NzMessageService, private cdr: ChangeDetectorRef) {
    brand.setSidebar(true);
  }

  updateShortcutDropped(e: CdkDragDrop<MSProduct[]>): void {
    moveItemInArray(this.shortcuts, e.previousIndex, e.currentIndex);

    this.msg.success(`New preference: ${this.shortcuts.map(i => i.name)}`);
  }

  search(scroll: boolean = true): void {
    const res = this.srv.search(this.q);
    this.searchList = res.list;
    this.searchCategories = res.categories;

    this.cdr.detectChanges();

    if (scroll) {
      // wait angular render
      setTimeout(() => {
        // 滚动至顶部
        this.categoryEl.nativeElement.scrollTop = 0;
      });
    }
  }

  setShortcut(i: MSProduct): void {
    this.srv.setShortcut(i);
    this.search(false);
  }

  ngAfterViewInit(): void {
    this.srv.getData().subscribe(() => {
      this.inited = true;
      this.search();
    });
  }

  ngOnDestroy(): void {
    this.brand.setSidebar(false);
  }
}
