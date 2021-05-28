import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'web-app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  showLabels = true;

  navItems = [
    {
      icon: 'home',
      label: 'Home',
      url: '/'
    }
  ];

  private readonly _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  public toggleLabels(): void {
    this.showLabels = !this.showLabels;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
