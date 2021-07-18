import { By } from '@angular/platform-browser';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: MockedComponentFixture<AppComponent>;

  beforeEach(async () => {
    await MockBuilder(AppComponent, AppModule);
    await render();
  });

  it('should create and render the web app shell', () => {
    const webAppShell = fixture.debugElement.query(By.css('[data-e2e=web-app-shell]'));

    expect(component).toBeTruthy();
    expect(webAppShell).toBeTruthy();
  });

  async function render(params: Pick<AppComponent, never> = {}) {
    fixture = MockRender(AppComponent, params as AppComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
    return fixture.whenRenderingDone();
  }
});
