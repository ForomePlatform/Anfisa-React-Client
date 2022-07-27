import { action, makeAutoObservable, reaction, runInAction } from 'mobx'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { TIcons } from '@ui/icon/icons'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { showToast } from '@utils/notifications/showToast'

export class DescriptionCardStore {
  public activeDtree: string = ''

  private _dsName = ''
  private _descriptions: { [key: string]: string } = {}
  private _typingTimer: ReturnType<typeof setTimeout> | undefined

  isEditMode = false
  isTyping = false

  constructor() {
    makeAutoObservable(this, { setDsName: action })
    reaction(
      () => this._dsName,
      () => {
        this.reset()
      },
    )
  }

  public get note(): string {
    return (
      this._descriptions[this._dsName] ||
      dirinfoStore.dirInfoData?.dsDict[this._dsName]?.note ||
      ''
    )
  }

  public get datasetDescription(): string {
    return this.note || t('home.datasetDescriptionDefault')
  }

  public get fieldDefaultValue(): string {
    return !this.note.length ? '' : this.datasetDescription
  }

  public get editIconName(): TIcons {
    if (!this.isEditMode && !this.note?.length) {
      return 'MiniPlus'
    }
    return this.isEditMode ? 'Check' : 'Edit'
  }

  public setDsName = (dsName: string): void => {
    this._dsName = dsName
  }

  public reset = (): void => {
    this.isEditMode = false
    this.isTyping = false
  }

  public toggleEditMode = (): void => {
    this.isEditMode = !this.isEditMode
  }

  public handleChange = (description: string) => {
    const dsName = this._dsName
    this.isTyping = true
    this._typingTimer && clearTimeout(this._typingTimer)
    this._typingTimer = setTimeout(() => {
      this.saveDescription(dsName, description)
    }, 1000)
  }

  public saveDescription = (ds: string, description: string): void => {
    datasetProvider
      .updateDsInfo({
        ds,
        note: description,
      })
      .then(() => {
        runInAction(() => {
          this.isTyping = false
          this._descriptions[ds] = description
        })
        showToast(t('home.datasetDescriptionSaved'), 'success')
      })
      .catch(() => {
        showToast(t('error.smthWentWrong'), 'error')
      })
  }
}

export default new DescriptionCardStore()
