import { DirectiveModule } from './directive.module';

describe('DirectiveModule', () => {
  let directiveModule: DirectiveModule;

  beforeEach(() => {
    directiveModule = new DirectiveModule();
  });

  it('should create an instance', () => {
    expect(directiveModule).toBeTruthy();
  });
});
