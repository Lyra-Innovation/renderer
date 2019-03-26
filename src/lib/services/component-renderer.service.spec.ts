import { TestBed } from '@angular/core/testing';

import { ComponentRendererService } from './component-renderer.service';

describe('ComponentRendererService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentRendererService = TestBed.get(ComponentRendererService);
    expect(service).toBeTruthy();
  });
});
