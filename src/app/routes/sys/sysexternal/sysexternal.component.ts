import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-sys-sysexternal',
  templateUrl: './sysexternal.component.html'
})
export class SysSysexternalComponent implements OnInit {
  iframesrc: any;
  queryParams: any;
  constructor(
    private msgSrv: NzMessageService,
    private http: _HttpClient,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      if (params.eurl != undefined) {
        this.iframesrc = this.sanitizer.bypassSecurityTrustResourceUrl(params.eurl);
      }
      console.log(this.queryParams);
    });
  }
}
