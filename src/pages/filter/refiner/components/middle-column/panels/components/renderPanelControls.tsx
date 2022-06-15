import { t } from '@i18n'
import { Button } from '@ui/button'
import {
  TFuncCondition,
  TNumericConditionBounds,
} from '@service-providers/common'

interface IRenderPanelControlsProps {
  initialCondition:
    | string[]
    | TNumericConditionBounds
    | TFuncCondition
    | undefined
  disabled: boolean
  saveAttribute: () => void
  clearValue: () => void
}

export const renderPanelControls = ({
  initialCondition,
  disabled,
  clearValue,
  saveAttribute,
}: IRenderPanelControlsProps) => (
  <div className="flex-1 flex items-end justify-end mt-1 pb-6">
    <Button
      variant={'secondary'}
      text={t('general.clear')}
      onClick={clearValue}
      className="px-5 mr-2"
    />
    <Button
      text={
        initialCondition
          ? t('condition.saveChanges')
          : t('condition.addAttribute')
      }
      onClick={saveAttribute}
      disabled={disabled}
    />
  </div>
)
