import { Component } from '@angular/core';

import {HomeGridAction, HomeGridItem} from './home.model';

@Component({
  selector: 'web-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public items: HomeGridItem[];

  constructor() {
    this.items = this.getHomeGridItems(7);
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
        img: 'https://picsum.photos/600/400?grayscale',
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
