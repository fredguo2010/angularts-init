import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RTLService } from '@delon/theme';

@Component({
  selector: 'ms-rtl',
  template: `
    <span class="alain-ms__topbar-item-btn">
      {{ rtl.nextDir | uppercase }}
    </span>
  `,
  host: {
    '[class.alain-ms__topbar-item]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MSRTLComponent {
  constructor(public rtl: RTLService) {}

  @HostListener('click')
  toggleDirection(): void {
    this.rtl.toggle();
  }
}
