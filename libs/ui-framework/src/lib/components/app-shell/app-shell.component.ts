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

  public navItems = [
    {
      icon: 'home',
      label: 'Home',
      url: '/'
    }
  ];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public toggleLabels(): void {
    this.showLabels = !this.showLabels;
    this.sideNavMode = this.showLabels ? 'over' : 'side';

    this.changeDetectorRef.detectChanges();
  }
}
