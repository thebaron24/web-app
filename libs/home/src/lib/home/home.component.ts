import { Component } from '@angular/core';

@Component({
  selector: 'web-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private fillerContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  public fillerObjects = Array.from({length: 7}, () => {
    return {
      icon: 'home',
      title: 'Heading',
      subTitle: 'Sub Heading',
      img: 'https://picsum.photos/600/400?grayscale',
      imgAlt: 'Random Photo',
      content: this.fillerContent,
      actions: [
        {
          name: 'action1',
          action: '#'
        },
        {
          name: 'action2',
          action: '#'
        }
      ]
    }
  });

  public handleAction(action) {
    alert(`${action.name} selected`);
  }
}
