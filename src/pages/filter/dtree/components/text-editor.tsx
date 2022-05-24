import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Divider } from '@ui/divider'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import modalsVisibilityStore from './modals/modals-visibility-store'

export const TextEditor = observer(() => (
  <>
    <Divider orientation="vertical" className="h-[75%]" />

    <Button
      text={t('dtree.textEditor')}
      size="md"
      variant="secondary-dark"
      onClick={modalsVisibilityStore.openModalTextEditor}
      dataTestId={DecisionTreesMenuDataCy.textEditor}
    />
  </>
))
