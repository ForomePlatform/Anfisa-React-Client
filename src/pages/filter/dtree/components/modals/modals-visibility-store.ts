import { makeAutoObservable } from 'mobx'

class ModalsVisibilityStore {
  groupNameToChange = ''
  groupIndexToChange = 0
  dtreeOperation = ''
  modalSource = ''

  isSelectAttributeDialogVisible = false

  isInheritanceModeDialogVisible = false
  isCustomInheritanceModeDialogVisible = false
  isCompoundHetDialogVisible = false
  isCompoundRequestDialogVisible = false
  isGeneRegionDialogVisible = false

  isEnumDialogVisible = false
  isNumericDialogVisible = false

  constructor() {
    makeAutoObservable(this)
  }

  // 1. Modals for creation brand new tree

  public openSelectAttributeDialog() {
    this.isSelectAttributeDialogVisible = true
  }

  public closeSelectAttributeDialog = () => {
    this.isSelectAttributeDialogVisible = false
  }

  // 2. Numeric dialog

  public openNumericDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isNumericDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeNumericDialog = (): void => {
    this.isNumericDialogVisible = false
  }

  // 3. Enum dialog

  public openEnumDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source

    this.isEnumDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeEnumDialog = () => {
    this.isEnumDialogVisible = false
  }

  // 4. Func dialogs

  public openInheritanceModeDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isInheritanceModeDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeInheritanceModeDialog = () => {
    this.isInheritanceModeDialogVisible = false
  }

  public openCustomInheritanceModeDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isCustomInheritanceModeDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeCustomInheritanceModeDialog = () => {
    this.isCustomInheritanceModeDialogVisible = false
  }

  public openCompoundHetDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isCompoundHetDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeCompoundHetDialog = () => {
    this.isCompoundHetDialogVisible = false
  }

  public openCompoundRequestDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isCompoundRequestDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeCompoundRequestDialog = () => {
    this.isCompoundRequestDialogVisible = false
  }

  public openGeneRegionDialog(
    groupName: string,
    groupIndex: number | undefined,
    source: string = '',
  ) {
    this.modalSource = source
    this.isGeneRegionDialogVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex ?? -1
  }

  public closeGeneRegionDialog = () => {
    this.isGeneRegionDialogVisible = false
  }
}

export default new ModalsVisibilityStore()
