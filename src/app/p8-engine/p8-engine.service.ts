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
const withVarroaMite = 'wvm'
const withoutVarroaMite = 'wovm'

interface InterimProcessingResult {
  yearNum:number,
  scenarios:{
    wsp:InterimScenarioResult,
    wosp:InterimScenarioResult,
    wvm:InterimScenarioResult,
    wovm:InterimScenarioResult
  }
}

class InterimScenarioResult {
  constructor (
    readonly pollEff:number,
    readonly netProfit:number,
    readonly grossProfit:number
  ) { }
}

class ScenarioResult {
  constructor (
    readonly yearNum:number,
    readonly scenario:string, // TODO change all these to numbers
    readonly pollEff:string,
    readonly netProfit:string,
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
          wosp: computeWosp(yearNum, scenarioModel),
          wvm: computeWvm(yearNum, scenarioModel),
          wovm: computeWovm(yearNum, scenarioModel)
        }
      })
    }
    return result
  }
}

function computeWsp (yearNum:number, scenarioModel:ScenarioModel):InterimScenarioResult {
  let grossProfit = yearNum * 1000 * scenarioModel.fieldArea.value
  return new InterimScenarioResult(
    100 - ((Math.pow(yearNum, 2) * scenarioModel.fieldArea.value) % 100),
    grossProfit - (100 * yearNum),
    grossProfit)
}

function computeWosp (yearNum:number, scenarioModel:ScenarioModel):InterimScenarioResult {
  let grossProfit = yearNum * 500 * scenarioModel.fieldArea.value
  return new InterimScenarioResult(
    100 - ((yearNum * scenarioModel.fieldArea.value * 2) % 100),
    grossProfit - (100 * yearNum),
    grossProfit)
}

function computeWvm (yearNum:number, scenarioModel:ScenarioModel):InterimScenarioResult {
  let grossProfit = yearNum * 200 * scenarioModel.fieldArea.value
  return new InterimScenarioResult(
    100 - ((yearNum * scenarioModel.fieldArea.value * 3) % 100),
    grossProfit - (100 * yearNum),
    grossProfit)
}

function computeWovm (yearNum:number, scenarioModel:ScenarioModel):InterimScenarioResult {
  let grossProfit = yearNum * 700 * scenarioModel.fieldArea.value
  return new InterimScenarioResult(
    100 - ((yearNum * scenarioModel.fieldArea.value * 4) % 100),
    grossProfit - (100 * yearNum),
    grossProfit)
}

class FinalProcessor implements Processor {
  handle (processedResult:InterimProcessingResult[], scenarioModel:ScenarioModel) {
    return processedResult.reduce((accumulator, currInterimResult) => {
      accumulator.push(buildScenarioResult(currInterimResult, withSuperPollinatorHabitat))
      accumulator.push(buildScenarioResult(currInterimResult, withoutSuperPollinatorHabitat))
      accumulator.push(buildScenarioResult(currInterimResult, withVarroaMite))
      accumulator.push(buildScenarioResult(currInterimResult, withoutVarroaMite))
      return accumulator
    }, [])
  }
}

function buildScenarioResult (interimResult:InterimProcessingResult, scenarioCode:string) {
  return new ScenarioResult(
    interimResult.yearNum,
    scenarioCode,
    '' + interimResult.scenarios[scenarioCode].pollEff,
    '' + interimResult.scenarios[scenarioCode].netProfit,
    '' + interimResult.scenarios[scenarioCode].grossProfit)
}
