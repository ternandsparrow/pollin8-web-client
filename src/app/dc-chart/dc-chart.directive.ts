import { Directive, ElementRef, Input } from '@angular/core'

const directiveName = 'dc-chart'
@Directive({
  selector: `[${directiveName}]`
})
export class DcChartDirective {
  private nativeElement: Node
  @Input() extraConfigCallback:(chart, dc, d3)=>void
  @Input(directiveName) chartType:string
  // place the copy+paste @Input code here \/ see `generate-input-code.html`
  @Input('dcAddFilterHandler') addFilterHandler:any
  @Input('dcAlignYAxes') alignYAxes:any
  @Input('dcAlwaysUseRounding') alwaysUseRounding:any
  @Input('dcAnchor') anchor:any
  @Input('dcAnchorName') anchorName:any
  @Input('dcBarPadding') barPadding:any
  @Input('dcBrush') brush:any
  @Input('dcBrushIsEmpty') brushIsEmpty:any
  @Input('dcBrushOn') brushOn:boolean
  @Input('dcBubbleR') bubbleR:any
  @Input('dcCalculateColorDomain') calculateColorDomain:any
  @Input('dcCalculateRadiusDomain') calculateRadiusDomain:any
  @Input('dcCap') cap:any
  @Input('dcCappedKeyAccessor') cappedKeyAccessor:any
  @Input('dcCappedValueAccessor') cappedValueAccessor:any
  @Input('dcCenterBar') centerBar:any
  @Input('dcChart') chart:any
  @Input('dcChartBodyG') chartBodyG:any
  @Input('dcChartGroup') chartGroup:any
  @Input('dcChildOptions') childOptions:any
  @Input('dcChildren') children:any
  @Input('dcClipPadding') clipPadding:any
  @Input('dcColorAccessor') colorAccessor:any
  @Input('dcColorCalculator') colorCalculator:any
  @Input('dcColorDomain') colorDomain:any
  @Input('dcColors') colors:any
  @Input('dcCommitHandler') commitHandler:any
  @Input('dcCompose') compose:any
  @Input('dcControlsUseVisibility') controlsUseVisibility:any
  @Input('dcCx') cx:any
  @Input('dcCy') cy:any
  @Input('dcDashStyle') dashStyle:any
  @Input('dcData') data:any
  @Input('dcDefaultColorAccessor') defaultColorAccessor:any
  @Input('dcDefined') defined:any
  @Input('dcDimension') dimension:{}[]
  @Input('dcDoUpdateLabels') doUpdateLabels:any
  @Input('dcDoUpdateTitles') doUpdateTitles:any
  @Input('dcDotRadius') dotRadius:any
  @Input('dcDrawPaths') drawPaths:any
  @Input('dcEffectiveHeight') effectiveHeight:any
  @Input('dcEffectiveWidth') effectiveWidth:any
  @Input('dcElasticRadius') elasticRadius:any
  @Input('dcElasticX') elasticX:any
  @Input('dcElasticY') elasticY:any
  @Input('dcEmptyTitle') emptyTitle:any
  @Input('dcEvadeDomainFilter') evadeDomainFilter:any
  @Input('dcExpireCache') expireCache:any
  @Input('dcExtendBrush') extendBrush:any
  @Input('dcExternalLabels') externalLabels:any
  @Input('dcExternalRadiusPadding') externalRadiusPadding:any
  @Input('dcFadeDeselected') fadeDeselected:any
  @Input('dcFadeDeselectedArea') fadeDeselectedArea:any
  @Input('dcFilter') filter:any
  @Input('dcFilterAll') filterAll:any
  @Input('dcFilterHandler') filterHandler:any
  @Input('dcFilterPrinter') filterPrinter:any
  @Input('dcFilters') filters:any
  @Input('dcFixedBarHeight') fixedBarHeight:any
  @Input('dcFocus') focus:any
  @Input('dcFocusChart') focusChart:any
  @Input('dcG') g:any
  @Input('dcGap') gap:any
  @Input('dcGeoJsons') geoJsons:any
  @Input('dcGeoPath') geoPath:any
  @Input('dcGetColor') getColor:any
  @Input('dcGetValueAccessorByIndex') getValueAccessorByIndex:any
  @Input('dcGroup') group:{}[]
  @Input('dcHasFilter') hasFilter:any
  @Input('dcHasFilterHandler') hasFilterHandler:any
  @Input('dcHeight') height:number
  @Input('dcHidableStacks') hidableStacks:any
  @Input('dcHideStack') hideStack:any
  @Input('dcHighlightSelected') highlightSelected:any
  @Input('dcInnerRadius') innerRadius:any
  @Input('dcInterpolate') interpolate:any
  @Input('dcIsLegendableHidden') isLegendableHidden:any
  @Input('dcIsOrdinal') isOrdinal:any
  @Input('dcIsSelectedNode') isSelectedNode:any
  @Input('dcKeyAccessor') keyAccessor:any
  @Input('dcLabel') label:any
  @Input('dcLabelOffsetX') labelOffsetX:any
  @Input('dcLabelOffsetY') labelOffsetY:any
  @Input('dcLegend') legend:any
  @Input('dcLegendHighlight') legendHighlight:any
  @Input('dcLegendReset') legendReset:any
  @Input('dcLegendToggle') legendToggle:any
  @Input('dcLegendables') legendables:any
  @Input('dcLinearColors') linearColors:any
  @Input('dcMargins') margins:any
  @Input('dcMaxBubbleRelativeSize') maxBubbleRelativeSize:any
  @Input('dcMinAngleForLabel') minAngleForLabel:any
  @Input('dcMinHeight') minHeight:any
  @Input('dcMinRadius') minRadius:any
  @Input('dcMinRadiusWithLabel') minRadiusWithLabel:any
  @Input('dcMinWidth') minWidth:any
  @Input('dcMouseZoomable') mouseZoomable:any
  @Input('dcOn') on:any
  @Input('dcOnClick') onClick:any
  @Input('dcOptions') options:any
  @Input('dcOrdering') ordering:any
  @Input('dcOrdinalColors') ordinalColors:any
  @Input('dcOthersGrouper') othersGrouper:any
  @Input('dcOthersLabel') othersLabel:any
  @Input('dcOuterPadding') outerPadding:any
  @Input('dcOverlayGeoJson') overlayGeoJson:any
  @Input('dcPlotData') plotData:any
  @Input('dcProjection') projection:any
  @Input('dcR') r:any
  @Input('dcRMax') rMax:any
  @Input('dcRMin') rMin:any
  @Input('dcRadius') radius:any
  @Input('dcRadiusValueAccessor') radiusValueAccessor:any
  @Input('dcRangeChart') rangeChart:any
  @Input('dcRedraw') redraw:any
  @Input('dcRedrawBrush') redrawBrush:any
  @Input('dcRedrawGroup') redrawGroup:any
  @Input('dcRefocused') refocused:any
  @Input('dcRemoveFilterHandler') removeFilterHandler:any
  @Input('dcRemoveGeoJson') removeGeoJson:any
  @Input('dcRender') render:any
  @Input('dcRenderArea') renderArea:any
  @Input('dcRenderBrush') renderBrush:any
  @Input('dcRenderDataPoints') renderDataPoints:any
  @Input('dcRenderGroup') renderGroup:any
  @Input('dcRenderHorizontalGridLines') renderHorizontalGridLines:any
  @Input('dcRenderLabel') renderLabel:any
  @Input('dcRenderTitle') renderTitle:any
  @Input('dcRenderTitleLabel') renderTitleLabel:any
  @Input('dcRenderVerticalGridLines') renderVerticalGridLines:any
  @Input('dcRenderXAxis') renderXAxis:any
  @Input('dcRenderYAxis') renderYAxis:any
  @Input('dcRenderYAxisAt') renderYAxisAt:any
  @Input('dcRenderYAxisLabel') renderYAxisLabel:any
  @Input('dcRenderlet') renderlet:any
  @Input('dcReplaceFilter') replaceFilter:any
  @Input('dcRescale') rescale:any
  @Input('dcResetFilterHandler') resetFilterHandler:any
  @Input('dcResetHighlight') resetHighlight:any
  @Input('dcResetSvg') resetSvg:any
  @Input('dcResizeHandlePath') resizeHandlePath:any
  @Input('dcResizing') resizing:any
  @Input('dcRightY') rightY:any
  @Input('dcRightYAxis') rightYAxis:any
  @Input('dcRightYAxisLabel') rightYAxisLabel:any
  @Input('dcRoot') root:any
  @Input('dcRound') round:any
  @Input('dcRowsCap') rowsCap:any
  @Input('dcSelect') select:any
  @Input('dcSelectAll') selectAll:any
  @Input('dcSeriesAccessor') seriesAccessor:any
  @Input('dcSeriesSort') seriesSort:any
  @Input('dcSetBrushY') setBrushY:any
  @Input('dcSetHandlePaths') setHandlePaths:any
  @Input('dcShareColors') shareColors:any
  @Input('dcShareTitle') shareTitle:any
  @Input('dcShowStack') showStack:any
  @Input('dcSlicesCap') slicesCap:any
  @Input('dcSortBubbleSize') sortBubbleSize:any
  @Input('dcStack') stack:any
  @Input('dcStackLayout') stackLayout:any
  @Input('dcSvg') svg:any
  @Input('dcTakeFront') takeFront:any
  @Input('dcTension') tension:any
  @Input('dcTitle') title:any
  @Input('dcTitleLabelOffsetX') titleLabelOffsetX:any
  @Input('dcTransitionDelay') transitionDelay:any
  @Input('dcTransitionDuration') transitionDuration:any
  @Input('dcTurnOffControls') turnOffControls:any
  @Input('dcTurnOnControls') turnOnControls:any
  @Input('dcUseRightAxisGridLines') useRightAxisGridLines:any
  @Input('dcUseRightYAxis') useRightYAxis:any
  @Input('dcUseViewBoxResizing') useViewBoxResizing:any
  @Input('dcValueAccessor') valueAccessor:any
  @Input('dcValueSort') valueSort:any
  @Input('dcWidth') width:number
  @Input('dcX') x:any
  @Input('dcXAxis') xAxis:any
  @Input('dcXAxisLabel') xAxisLabel:any
  @Input('dcXAxisLength') xAxisLength:any
  @Input('dcXAxisMax') xAxisMax:any
  @Input('dcXAxisMin') xAxisMin:any
  @Input('dcXAxisPadding') xAxisPadding:any
  @Input('dcXAxisPaddingUnit') xAxisPaddingUnit:any
  @Input('dcXOriginalDomain') xOriginalDomain:any
  @Input('dcXUnitCount') xUnitCount:any
  @Input('dcXUnits') xUnits:any
  @Input('dcXyTipsOn') xyTipsOn:any
  @Input('dcY') y:any
  @Input('dcYAxis') yAxis:any
  @Input('dcYAxisHeight') yAxisHeight:any
  @Input('dcYAxisLabel') yAxisLabel:string
  @Input('dcYAxisMax') yAxisMax:any
  @Input('dcYAxisMin') yAxisMin:any
  @Input('dcYAxisPadding') yAxisPadding:any
  @Input('dcZoomOutRestrict') zoomOutRestrict:any
  @Input('dcZoomScale') zoomScale:any
  // place the copy+paste @Input code here /\ see `generate-input-code.html`

  constructor(private element: ElementRef) {
    this.nativeElement = element.nativeElement
  }

  ngAfterContentInit() {
    let dc = window['dc'] // FIXME get typings working
    let d3 = window['d3'] // FIXME get typings working
    let theChart = dc[this.chartType](this.nativeElement)
    // place the copy+paste 'apply input value' code here \/ see `generate-input-code.html`
    const attributeNames = [
      'addFilterHandler',
      'alignYAxes',
      'alwaysUseRounding',
      'anchor',
      'anchorName',
      'barPadding',
      'brush',
      'brushIsEmpty',
      'brushOn',
      'bubbleR',
      'calculateColorDomain',
      'calculateRadiusDomain',
      'cap',
      'cappedKeyAccessor',
      'cappedValueAccessor',
      'centerBar',
      'chart',
      'chartBodyG',
      'chartGroup',
      'childOptions',
      'children',
      'clipPadding',
      'colorAccessor',
      'colorCalculator',
      'colorDomain',
      'colors',
      'commitHandler',
      'compose',
      'controlsUseVisibility',
      'cx',
      'cy',
      'dashStyle',
      'data',
      'defaultColorAccessor',
      'defined',
      'dimension',
      'doUpdateLabels',
      'doUpdateTitles',
      'dotRadius',
      'drawPaths',
      'effectiveHeight',
      'effectiveWidth',
      'elasticRadius',
      'elasticX',
      'elasticY',
      'emptyTitle',
      'evadeDomainFilter',
      'expireCache',
      'extendBrush',
      'externalLabels',
      'externalRadiusPadding',
      'fadeDeselected',
      'fadeDeselectedArea',
      'filter',
      'filterAll',
      'filterHandler',
      'filterPrinter',
      'filters',
      'fixedBarHeight',
      'focus',
      'focusChart',
      'g',
      'gap',
      'geoJsons',
      'geoPath',
      'getColor',
      'getValueAccessorByIndex',
      'group',
      'hasFilter',
      'hasFilterHandler',
      'height',
      'hidableStacks',
      'hideStack',
      'highlightSelected',
      'innerRadius',
      'interpolate',
      'isLegendableHidden',
      'isOrdinal',
      'isSelectedNode',
      'keyAccessor',
      'label',
      'labelOffsetX',
      'labelOffsetY',
      'legend',
      'legendHighlight',
      'legendReset',
      'legendToggle',
      'legendables',
      'linearColors',
      'margins',
      'maxBubbleRelativeSize',
      'minAngleForLabel',
      'minHeight',
      'minRadius',
      'minRadiusWithLabel',
      'minWidth',
      'mouseZoomable',
      'on',
      'onClick',
      'options',
      'ordering',
      'ordinalColors',
      'othersGrouper',
      'othersLabel',
      'outerPadding',
      'overlayGeoJson',
      'plotData',
      'projection',
      'r',
      'rMax',
      'rMin',
      'radius',
      'radiusValueAccessor',
      'rangeChart',
      'redraw',
      'redrawBrush',
      'redrawGroup',
      'refocused',
      'removeFilterHandler',
      'removeGeoJson',
      'render',
      'renderArea',
      'renderBrush',
      'renderDataPoints',
      'renderGroup',
      'renderHorizontalGridLines',
      'renderLabel',
      'renderTitle',
      'renderTitleLabel',
      'renderVerticalGridLines',
      'renderXAxis',
      'renderYAxis',
      'renderYAxisAt',
      'renderYAxisLabel',
      'renderlet',
      'replaceFilter',
      'rescale',
      'resetFilterHandler',
      'resetHighlight',
      'resetSvg',
      'resizeHandlePath',
      'resizing',
      'rightY',
      'rightYAxis',
      'rightYAxisLabel',
      'root',
      'round',
      'rowsCap',
      'select',
      'selectAll',
      'seriesAccessor',
      'seriesSort',
      'setBrushY',
      'setHandlePaths',
      'shareColors',
      'shareTitle',
      'showStack',
      'slicesCap',
      'sortBubbleSize',
      'stack',
      'stackLayout',
      'svg',
      'takeFront',
      'tension',
      'title',
      'titleLabelOffsetX',
      'transitionDelay',
      'transitionDuration',
      'turnOffControls',
      'turnOnControls',
      'useRightAxisGridLines',
      'useRightYAxis',
      'useViewBoxResizing',
      'valueAccessor',
      'valueSort',
      'width',
      'x',
      'xAxis',
      'xAxisLabel',
      'xAxisLength',
      'xAxisMax',
      'xAxisMin',
      'xAxisPadding',
      'xAxisPaddingUnit',
      'xOriginalDomain',
      'xUnitCount',
      'xUnits',
      'xyTipsOn',
      'y',
      'yAxis',
      'yAxisHeight',
      'yAxisLabel',
      'yAxisMax',
      'yAxisMin',
      'yAxisPadding',
      'zoomOutRestrict',
      'zoomScale'
    ]
    // place the copy+paste 'apply input value' code here /\ see `generate-input-code.html`
    attributeNames.forEach(e => {
      this.applyIfSupplied(theChart, e)
    })
    if (this.extraConfigCallback) {
      this.extraConfigCallback(theChart, dc, d3)
    }
    theChart.render()
  }

  private applyIfSupplied (theChart, attributeName:string) {
    if (typeof this[attributeName] === 'undefined') {
      return
    }
    theChart[attributeName](this[attributeName])
  }
}
