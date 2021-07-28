import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'web-app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {

  public showLabels = true;
  public sideNavMode: MatDrawerMode = 'over';

  public mainNav = [
    {
      icon: 'menu',
      label: 'Menu',
      url: '/',
      e2e: 'shell-menu-button'
    }
  ];

  public sideBarNav = [
    {
      icon: 'home',
      label: 'Home',
      url: '/',
      e2e: ''
    }
  ];

  public userNav = [
    {
      icon: 'person',
      label: 'Person',
      url: '/',
      e2e: ''
    },
    {
      icon: 'share',
      label: 'Share',
      url: '/',
      e2e: ''
    },
    {
      icon: 'settings',
      label: 'Settings',
      url: '/',
      e2e: ''
    }
  ];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public toggleLabels(): void {
    this.showLabels = !this.showLabels;
    this.sideNavMode = this.showLabels ? 'over' : 'side';

    setTimeout(() => this.changeDetectorRef.detectChanges(), 0);
  }
}
