import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ContentGridContent } from './content-grid.model';

@Component({
  selector: 'web-app-content-grid',
  templateUrl: './content-grid.component.html',
  styleUrls: ['./content-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentGridComponent<T> {

  @Input()
  public items: ContentGridContent<T>[]

  @Input()
  public basis?: string = '20em'

  @Input()
  public spacer?: string = '5px';

  @Output()
  public action: EventEmitter<T> = new EventEmitter<T>();

  public handleAction(action: T) {
    this.action.emit(action)
  }

}
