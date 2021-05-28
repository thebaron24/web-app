import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'web-app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  showLabels = true;

  navItems = [
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
    this.changeDetectorRef.detectChanges();
  }

}
