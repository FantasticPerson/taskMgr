import { ServivesModule } from './servives.module';

describe('ServivesModule', () => {
  let servivesModule: ServivesModule;

  beforeEach(() => {
    servivesModule = new ServivesModule();
  });

  it('should create an instance', () => {
    expect(servivesModule).toBeTruthy();
  });
});
