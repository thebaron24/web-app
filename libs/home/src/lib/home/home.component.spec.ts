import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';

import { HomeModule } from '../home.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: MockedComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await MockBuilder(HomeComponent, HomeModule);
    await render();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  async function render(params: Pick<HomeComponent, never> = {}) {
    fixture = MockRender(HomeComponent, params as HomeComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
    return fixture.whenRenderingDone();
  }
});
