import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContentGridContent } from './content-grid.model';

@Component({
  selector: 'web-app-content-grid',
  templateUrl: './content-grid.component.html',
  styleUrls: ['./content-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentGridComponent {

  @Input()
  public items: ContentGridContent[]

}
