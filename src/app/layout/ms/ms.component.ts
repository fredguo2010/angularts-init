import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ThemeBtnType } from '@delon/theme/theme-btn';
import { updateHostClass } from '@delon/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';

import { BrandService } from './ms.service';

@Component({
  selector: 'layout-ms',
  templateUrl: './ms.component.html'
})
export class MSLayoutComponent implements OnInit, OnDestroy {
  private notify$!: Subscription;
  private queryCls?: string;
  isFetching = false;
  // 是否单页，单页不显示侧边栏
  hasAllNav = false;
  hasSidebar = true;
  themes: ThemeBtnType[] = [
    { key: 'default', text: 'Default Theme' },
    { key: 'compact', text: 'Compact Theme' }
  ];

  get isMobile(): boolean {
    return this.srv.isMobile;
  }

  private get body(): HTMLElement {
    return this.doc.body;
  }

  constructor(
    bm: BreakpointObserver,
    mediaMatcher: MediaMatcher,
    router: Router,
    route: ActivatedRoute,
    msg: NzMessageService,
    reuseTabSrv: ReuseTabService,
    private el: ElementRef,
    private renderer: Renderer2,
    private srv: BrandService,
    @Inject(DOCUMENT) private doc: any
  ) {
    const routerData = {
      hasAllNav: false,
      hasSidebar: true,
      ...route.snapshot.data
    };
    this.hasAllNav = routerData.hasAllNav === true;
    this.hasSidebar = routerData.hasSidebar === true;

    // scroll to top in change page
    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
        this.scrollToTop();
      }
      if (evt instanceof NavigationError) {
        this.isFetching = false;
        msg.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      this.isFetching = false;
      // If have already cached router, should be don't need scroll to top
      if (reuseTabSrv.exists(evt.url)) {
        return;
      }

      this.scrollToTop();
    });

    // media
    const query: { [key: string]: string } = {
      'screen-xs': '(max-width: 575px)',
      'screen-sm': '(min-width: 576px) and (max-width: 767px)',
      'screen-md': '(min-width: 768px) and (max-width: 991px)',
      'screen-lg': '(min-width: 992px) and (max-width: 1199px)',
      'screen-xl': '(min-width: 1200px)'
    };
    bm.observe([
      '(min-width: 1200px)',
      '(min-width: 992px) and (max-width: 1199px)',
      '(min-width: 768px) and (max-width: 991px)',
      '(min-width: 576px) and (max-width: 767px)',
      '(max-width: 575px)'
    ]).subscribe(() => {
      this.queryCls = Object.keys(query).find(key => mediaMatcher.matchMedia(query[key]).matches);
      this.setClass();
    });
  }

  private scrollToTop(): void {
    const el: HTMLElement = this.doc.querySelector('.alain-ms__product-body');
    if (!el) {
      return;
    }
    el.scrollTop = 0;
  }

  private setClass(): void {
    const { el, renderer, queryCls } = this;
    updateHostClass(
      el.nativeElement,
      renderer,
      {
        ['alain-ms']: true,
        [queryCls!]: true
      },
      true
    );
  }

  private setBodyClass(): void {
    const { hasTopbar, hasSidebar, hasFixed, colorWeak } = this.srv.layout;
    updateHostClass(this.body, this.renderer, {
      'color-weak': colorWeak,
      ['alain-ms__has-topbar']: hasTopbar,
      ['alain-ms__has-sidebar']: hasSidebar,
      ['alain-ms__has-fixed']: hasFixed
    });
  }

  ngOnInit(): void {
    this.notify$ = this.srv.notify.subscribe(() => {
      this.setClass();
      this.setBodyClass();
    });
  }

  ngOnDestroy(): void {
    this.notify$.unsubscribe();
    this.body.classList.remove('alain-ms__has-topbar', 'alain-ms__has-sidebar', 'alain-ms__has-fixed');
  }
}
