import { Button } from '../../lib/button'
import { Input } from '../../lib/input'
import { UIWidget } from '../../lib/ui-widget'

export interface AttributesListSelectors {
  searchForAttr: string
  selectAll: string
  addSelectedAttributes: string
  addByJoin: string
}
export class AttributesListWidget extends UIWidget {
  readonly searchForAttr: Input
  readonly selectAll: Button
  readonly addSelectedAttributes: Button
  readonly addByJoin: Button

  constructor(options: { selectors: AttributesListSelectors }) {
    super(options)

    const selectors = options.selectors

    this.searchForAttr = new Input(selectors.searchForAttr)
    this.selectAll = new Button(selectors.selectAll)
    this.addSelectedAttributes = new Button(selectors.addSelectedAttributes)
    this.addByJoin = new Button(selectors.addByJoin)
  }
}
