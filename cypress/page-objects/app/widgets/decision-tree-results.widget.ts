import { Button } from '../../lib/button'
import { Input } from '../../lib/input'
import { Label } from '../../lib/label'
import { Select } from '../../lib/select'
import { StepLabel } from '../../lib/stepLabel'
import { UIElement } from '../../lib/ui-element'
import { UIWidget } from '../../lib/ui-widget'

export interface DecisionTreeResultsSelectors {
  searchResults: string
  unitName: string
  unitGroupName: string
  unitChart: string
  unitPredictionPower: string
  searchStepsResults: string
  stepCard: string
  excludeInfo: string
  viewReturnedVariants: string
  resultsTitle: string
  addAttribute: string
  joinByLabel: string
  optionsMenu: string
  addStepAfter: string
  leftInput: string
  rightInput: string
  deleteStep: string
  numberInput: string
  selectReset: string
  addButton: string
  removeButton: string
  cancelButton: string
  gearButton: string
  contentEditor: string
  collapseAll: string
  expandAll: string
  modalHeader: string
  anyChangeAlert: string
}

export interface DecisionTreeResultsLabels {
  unitName?: string
  unitGroupName?: string
  stepCard: string
  resultsTitle: string
  joinByLabel: string
  contentEditor: string
  modalHeader: string
  anyChangeAlert: string
}

export class DecisionTreeResultsWidget extends UIWidget {
  readonly searchResults: Input

  readonly unitName: Label
  readonly unitGroupName: Label
  readonly unitChart: UIElement
  readonly unitPredictionPower: UIElement

  readonly searchStepsResults: Input
  readonly stepCard: StepLabel
  readonly excludeInfo: Button
  readonly viewReturnedVariants: Button
  readonly resultsTitle: Label
  readonly addAttribute: Button
  readonly joinByLabel: Label
  readonly optionsMenu: Button
  readonly addStepAfter: Button
  readonly leftInput: Input
  readonly rightInput: Input
  readonly deleteStep: Button
  readonly numberInput: Input
  readonly selectReset: Select
  readonly addButton: Button
  readonly removeButton: Button
  readonly cancelButton: Button
  readonly gearButton: Button
  readonly contentEditor: Label
  readonly collapseAll: Button
  readonly expandAll: Button
  readonly modalHeader: Label
  readonly anyChangeAlert: Label

  constructor(options: {
    selectors: DecisionTreeResultsSelectors
    labels: DecisionTreeResultsLabels
  }) {
    super(options)

    const selectors = options.selectors
    const labels = options.labels

    this.searchResults = new Input(selectors.searchResults)
    this.searchStepsResults = new Input(selectors.searchStepsResults)
    this.unitName = new Label(selectors.unitName, labels.unitName ?? '')
    this.unitGroupName = new Label(
      selectors.unitGroupName,
      labels.unitGroupName ?? '',
    )
    this.unitChart = new UIElement(selectors.unitChart)
    this.unitPredictionPower = new UIElement(selectors.unitPredictionPower)
    this.stepCard = new StepLabel(selectors.stepCard, labels.stepCard)
    this.excludeInfo = new Button(selectors.excludeInfo)
    this.viewReturnedVariants = new Button(selectors.viewReturnedVariants)
    this.resultsTitle = new Label(selectors.resultsTitle, labels.resultsTitle)
    this.addAttribute = new Button(selectors.addAttribute)
    this.joinByLabel = new Label(selectors.joinByLabel, labels.joinByLabel)
    this.optionsMenu = new Button(selectors.optionsMenu)
    this.addStepAfter = new Button(selectors.addStepAfter)
    this.leftInput = new Input(selectors.leftInput)
    this.rightInput = new Input(selectors.rightInput)
    this.deleteStep = new Button(selectors.deleteStep)
    this.numberInput = new Input(selectors.numberInput)
    this.selectReset = new Select(selectors.selectReset)
    this.addButton = new Button(selectors.addButton)
    this.removeButton = new Button(selectors.removeButton)
    this.cancelButton = new Button(selectors.cancelButton)
    this.gearButton = new Button(selectors.gearButton)
    this.contentEditor = new Label(
      selectors.contentEditor,
      labels.contentEditor,
    )
    this.expandAll = new Button(selectors.expandAll)
    this.collapseAll = new Button(selectors.collapseAll)
    this.modalHeader = new Label(selectors.modalHeader, labels.modalHeader)
    this.anyChangeAlert = new Label(
      selectors.anyChangeAlert,
      labels.anyChangeAlert,
    )
  }
}
