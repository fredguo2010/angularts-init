import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMenuModeType } from 'ng-zorro-antd/menu';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sys-account-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SysAccountSettingComponent implements AfterViewInit, OnDestroy {
  private resize$!: Subscription;
  private router$: Subscription;
  mode: NzMenuModeType = 'inline';
  title!: string;
  menus: Array<{ key: string; title: string; selected?: boolean }> = [
    {
      key: 'base',
      title: '基本设置'
    },
    {
      key: 'security',
      title: '安全设置'
    }
  ];
  constructor(private router: Router, private cdr: ChangeDetectorRef, private el: ElementRef<HTMLElement>) {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
  }

  private setActive(): void {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    this.menus.forEach(i => {
      i.selected = i.key === key;
    });
    this.title = this.menus.find(w => w.selected)!.title;
  }

  to(item: { key: string }): void {
    this.router.navigateByUrl(`sys/account/setting/${item.key}`);
  }

  private resize(): void {
    const el = this.el.nativeElement;
    let mode: NzMenuModeType = 'inline';
    const { offsetWidth } = el;
    if (offsetWidth < 641 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    this.mode = mode;
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.resize());
  }

  ngOnDestroy(): void {
    this.resize$.unsubscribe();
    this.router$.unsubscribe();
  }
}
