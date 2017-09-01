import { Injectable } from '@angular/core'

@Injectable()
export class P8EngineService {
  private processorChain = [
    new PollinatorQualityProcessor(),
    new PollinatorQuantityProcessor(),
    new FinalProcessor()
  ]

  compute (scenarioModel):ScenarioResult[] {
    let initial = [] // TODO do we need to init a value?
    return this.processorChain.reduce((previous, current) => {
      return current.handle(previous, scenarioModel)
    }, initial)
  }
}

const withSuperPollinatorHabitat = 'wsp'
const withoutSuperPollinatorHabitat = 'wosp'

interface InterimProcessingResult {
  yearNum:number,
  scenarios:{
    wsp:InterimScenarioResult,
    wosp:InterimScenarioResult
  }
}

class InterimScenarioResult {
  constructor (
    readonly cost:number,
    readonly pollEff:number,
    readonly profit:number,
    readonly grossProfit:number
  ) { }
}

class ScenarioResult {
  constructor (
    readonly yearNum:number,
    readonly scenario:string, // TODO change all these to numbers
    readonly cost:string,
    readonly pollEff:string,
    readonly profit:string,
    readonly grossProfit:string
  ) { }
}

export interface ScenarioModel {
  cropType:string,
  fieldLocation:{
    lat:number,
    lng:number
  },
  nativeVegCover:string,
  fieldArea: {
    value:number,
    units:string,
  },
  vegType:string
}

interface Processor {
  handle (previous:InterimProcessingResult[], scenarioModel:ScenarioModel)
}

class PollinatorQualityProcessor implements Processor {
  handle (previous:InterimProcessingResult[], scenarioModel:ScenarioModel) {
    // TODO calculate stuff
    return []
  }
}

class PollinatorQuantityProcessor implements Processor {
  handle (previous:InterimProcessingResult[], scenarioModel:ScenarioModel) {
    // TODO calculate stuff
    let result:InterimProcessingResult[] = [] // TODO do we need a 'now'/year 0 entry?
    for(let yearNum = 1; yearNum <= 10; yearNum++) {
      result.push({
        yearNum: yearNum,
        scenarios: {
          wsp: computeWsp(yearNum, scenarioModel),
          wosp: computeWosp(yearNum, scenarioModel)
        }
      })
    }
    return result
  }
}

function computeWsp (yearNum:number, scenarioModel:ScenarioModel):InterimScenarioResult {
  let cost = yearNum * 1000 * scenarioModel.fieldArea.value
  return new InterimScenarioResult(
    cost,
    100 - ((Math.pow(yearNum, 2) * scenarioModel.fieldArea.value) % 100),
    20000 - cost,
    8 * yearNum)
}

function computeWosp (yearNum:number, scenarioModel:ScenarioModel):InterimScenarioResult {
  let cost = yearNum * 500 * scenarioModel.fieldArea.value
  return new InterimScenarioResult(
    cost,
    100 - ((yearNum * scenarioModel.fieldArea.value) % 100),
    20000 - cost,
    2 * yearNum)
}

class FinalProcessor implements Processor {
  handle (processedResult:InterimProcessingResult[], scenarioModel:ScenarioModel) {
    return processedResult.reduce((previous, current) => {
      previous.push(buildScenarioResult(current, withSuperPollinatorHabitat))
      previous.push(buildScenarioResult(current, withoutSuperPollinatorHabitat))
      return previous
    }, [])
  }
}

function buildScenarioResult (interimResult:InterimProcessingResult, scenarioCode:string) {
  return new ScenarioResult(
    interimResult.yearNum,
    scenarioCode,
    '' + interimResult.scenarios[scenarioCode].cost,
    '' + interimResult.scenarios[scenarioCode].pollEff,
    '' + interimResult.scenarios[scenarioCode].profit,
    '' + interimResult.scenarios[scenarioCode].grossProfit)
}
