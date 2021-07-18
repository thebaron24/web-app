import { By } from '@angular/platform-browser';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';

import { ShellModule } from '../shell.module';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: MockedComponentFixture<ShellComponent>;

  beforeEach(async () => {
    await MockBuilder(ShellComponent, ShellModule);
    await render();
  });

  it('should create and render the shell component', () => {
    const webAppAppShell = fixture.debugElement.query(By.css('[data-e2e=web-app-app-shell]'))

    expect(webAppAppShell).toBeTruthy();
    expect(component).toBeTruthy();
  });

  async function render(params: Pick<ShellComponent, never> = {}) {
    fixture = MockRender(ShellComponent, params as ShellComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
    return fixture.whenRenderingDone();
  }
});
