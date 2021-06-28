import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'web-app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
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
