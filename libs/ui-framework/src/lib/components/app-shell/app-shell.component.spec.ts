import { AppShellModule } from '@web-app/ui-framework';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';

import { AppShellComponent } from './app-shell.component';

describe('AppShellComponent', () => {
  let component: AppShellComponent;
  let fixture: MockedComponentFixture<AppShellComponent>;

  beforeEach(async () => {
    await MockBuilder(AppShellComponent, AppShellModule);
    await render();
  });

  it('should create and render app shell component', () => {
    expect(component).toBeTruthy();
  });

  async function render(params: Pick<AppShellComponent, never> = {}) {
    fixture = MockRender(AppShellComponent, params as AppShellComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
    return fixture.whenRenderingDone();
  }
});
