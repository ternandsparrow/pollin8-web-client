import { TestBed, inject } from '@angular/core/testing';

import { P8EngineService } from './p8-engine.service';

describe('P8EngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [P8EngineService]
    });
  });

  it('should be created', inject([P8EngineService], (service: P8EngineService) => {
    expect(service).toBeTruthy();
  }));
});
