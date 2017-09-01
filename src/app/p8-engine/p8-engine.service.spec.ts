import { TestBed, inject } from '@angular/core/testing'

import { P8EngineService } from './p8-engine.service'

describe('P8EngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [P8EngineService]
    })
  })

  it('should compute the expected result', inject([P8EngineService], (objectUnderTest: P8EngineService) => {
    let scenarioModel = {
      cropType: 'apple',
      fieldLocation: { lat: -34.97839266420273, lng: 138.70934486389163 },
      nativeVegCover: 'c',
      fieldArea: { value: 123, units: 'a', },
      vegType: 'roadside'
    }
    let result = objectUnderTest.compute(scenarioModel)
    expect(result.length).toBe(20)
    expect(result.filter(v => { return v.scenario === 'wsp' }).length).toBe(10)
    expect(result.filter(v => { return v.scenario === 'wosp' }).length).toBe(10)
    for (let i = 1; i <= 10; i++) {
      expect(result.filter(v => { return v.yearNum === i }).length).toBe(2)
    }
  }))
})
