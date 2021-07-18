import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {By} from '@angular/platform-browser';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';

import { ContentGridComponent } from './content-grid.component';
import { ContentGridContent } from './content-grid.model';
import { ContentGridModule } from './content-grid.module';

interface GenericTestAction {
  name: string;
  action: string;
}

describe('ContentGridComponent', () => {
  let component: ContentGridComponent<GenericTestAction>;
  let fixture: MockedComponentFixture<ContentGridComponent<GenericTestAction>>;

  let items: ContentGridContent<GenericTestAction>[];
  let actionOutputSpy: jest.Mock;

  beforeEach(async () => {
    mockData();
    mockServices();
    await configureTestBed();
  });

  beforeEach(async () => {
    await render({ items, action: actionOutputSpy });
  });

  it('should create a ContentGridComponent with defaults', async () => {
    const id = 0;
    const itemAction = items.find((i) => i.icon === `${id}_icon`).actions.find((a) => a.name === `${id}_action_name_1`);

    expect(component).toBeTruthy();
    expect(component.items).toBe(items);
    expect(component.items.length).toBe(7);
    expect(component.basis).toEqual('20em');
    expect(component.spacer).toEqual('5px');

    spyOn(component.action, 'emit').and.callThrough();

    component.handleAction(itemAction);

    await fixture.detectChanges();

    expect(component.action.emit).toHaveBeenCalledWith(itemAction);
    expect(actionOutputSpy).toHaveBeenCalledWith(itemAction);
  });

  it('should show a content grid item in the view and emit action when clicked', async () => {
    const cardIndex = 0;
    const mockDataCard = items.find((i) => i.icon === `${cardIndex}_icon`);

    const cardTitleEl = fixture.debugElement.query(By.css(`[data-e2e=card-${cardIndex}-title]`));
    const cardSubTitleEl = fixture.debugElement.query(By.css(`[data-e2e=card-${cardIndex}-subTitle]`));
    const cardImageEl = fixture.debugElement.query(By.css(`[data-e2e=card-${cardIndex}-image]`));
    const cardParagraphEl = fixture.debugElement.query(By.css(`[data-e2e=card-${cardIndex}-content-paragraph]`));
    const cardButtonEl = fixture.debugElement.query(By.css(`[data-e2e=card-${cardIndex}-action-button-${cardIndex}]`));

    cardButtonEl.nativeElement.click();

    expect(cardTitleEl.nativeElement.innerHTML.trim()).toEqual(mockDataCard.title);
    expect(cardSubTitleEl.nativeElement.innerHTML.trim()).toEqual(mockDataCard.subTitle);
    expect(cardImageEl.nativeElement.src).toContain(mockDataCard.img);
    expect(cardParagraphEl.nativeElement.innerHTML.trim()).toEqual(mockDataCard.content);
    expect(cardButtonEl.nativeElement.innerHTML.trim()).toEqual(mockDataCard.actions[cardIndex].name);
    expect(actionOutputSpy).toHaveBeenCalledWith(mockDataCard.actions[cardIndex]);
  });

  function mockData() {
    items = Array.from({ length: 7 }, (v, index) => makeItem(index));
  }

  function mockServices() {
    actionOutputSpy = jest.fn();
  }

  function makeItem(id): ContentGridContent<GenericTestAction> {
    return {
      icon: `${id}_icon`,
      title: `${id}_title`,
      subTitle: `${id}_subTitle`,
      img: `${id}_img`,
      imgAlt: `${id}_imgAlt`,
      content: `${id}_content`,
      actions: [
      {
        name: `${id}_action_name_1`,
        action: `${id}_action_1`
      },
      {
        name: `${id}_action_name_2`,
        action: `${id}_action_2`
      }
    ]
    }
  }

  function configureTestBed() {
    return MockBuilder(ContentGridComponent, ContentGridModule)
      .keep(FormsModule)
      .keep(ReactiveFormsModule);
  }

  async function render(params: Pick<ContentGridComponent<GenericTestAction>, never> = {}) {
    fixture = MockRender(ContentGridComponent, params as ContentGridComponent<GenericTestAction>);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
    return fixture.whenRenderingDone();
  }
});
