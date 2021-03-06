import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgZone,
  PLATFORM_ID
} from '@angular/core';

import { HomeGridAction, HomeGridItem } from './home.model';

@Component({
  selector: 'web-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public items: HomeGridItem[];
  public headers: HomeGridItem[];

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Record<string, unknown>) {
    this.items = this.getHomeGridItems(10);
  }

  public handleGridAction(action: HomeGridAction) {
    alert(`${action.name} selected`);
  }

  private getHomeGridItems(length): HomeGridItem[] {
    return Array.from({ length }, (v, index) => {
      return {
        icon: `icon ${index}`,
        title: `Heading  ${index}`,
        subTitle: `Sub Heading  ${index}`,
        img: 'https://picsum.photos/600/400?grayscale' + `&random=${index}`,
        imgAlt: `Random Photo  ${index}`,
        content: ` ${index} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        actions: [
          {
            name: `${index} action1`,
            action: `#${index}`
          },
          {
            name: `${index} action2`,
            action: `#${index}`
          }
        ]
      }
    })
  }
}
