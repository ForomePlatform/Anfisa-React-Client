import { makeAutoObservable } from 'mobx'

const XL_STAT_LIST_LENGTH = 80
const WIDTH_CF = 100 / XL_STAT_LIST_LENGTH
export class ProgressBarStore {
  private _incompleteProps: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  public set incompleteProps(props: string[]) {
    this._incompleteProps = props
  }

  public get completePropsLength(): number {
    return XL_STAT_LIST_LENGTH - this._incompleteProps.length
  }

  public get progress(): number {
    return this.completePropsLength === XL_STAT_LIST_LENGTH
      ? 0
      : this.completePropsLength * WIDTH_CF
  }
}
