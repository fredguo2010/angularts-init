import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { I18NService, LangType } from '@core';
import { ALAIN_I18N_TOKEN, SettingsService } from '@delon/theme';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BrandService } from '../../ms.service';

@Component({
  selector: 'ms-langs',
  templateUrl: './langs.component.html',
  host: {
    '[class.alain-ms__topbar-item]': 'true',
    '[class.alain-ms__topbar-dd]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MSLangsComponent implements OnInit, OnDestroy {
  private brand$!: Subscription;
  langs: any[];
  text?: string;

  get isMobile(): boolean {
    return this.srv.isMobile;
  }

  constructor(
    private srv: BrandService,
    private settingsSrv: SettingsService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    @Inject(DOCUMENT) private doc: any,
    private cd: ChangeDetectorRef
  ) {
    this.langs = this.i18n.getLangs();
    this.update();
  }

  private update(): void {
    const item = this.langs.find(l => l.code === this.i18n.currentLang) || this.langs[0];
    this.text = item.text;
  }

  change(lang: LangType): void {
    // this.i18n.use(lang);
    this.settingsSrv.setLayout('lang', lang);
    this.update();
    setTimeout(() => this.doc.location.reload());
  }

  ngOnInit(): void {
    this.brand$ = this.srv.notify.pipe(filter(t => t === 'mobile')).subscribe(() => this.cd.detectChanges());
  }

  ngOnDestroy(): void {
    this.brand$.unsubscribe();
  }
}
