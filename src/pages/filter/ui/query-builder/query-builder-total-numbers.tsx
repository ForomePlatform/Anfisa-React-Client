import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { toJS } from 'mobx'

export const QueryBuilderTotalNumbers = observer(
  (): ReactElement => {
    const variants = toJS(dirinfoStore.dsinfo).total

    const stepData = toJS(dtreeStore.stepData)

    const stepIndex = stepData.findIndex(
      element => element.isActive || element.isReturnedVariantsActive,
    )

    const returnedVariants = stepData[stepIndex]?.difference
    const startVariants = stepData[stepIndex]?.startFilterCounts
    const hasReturnedVariants = Boolean(returnedVariants)
    const hasStartVariants = Boolean(startVariants)

    const openTableModal = (isReturnedVariants = true) => {
      const indexForApi = dtreeStore.getStepIndexForApi(stepIndex)
      const nextStepIndex = isReturnedVariants ? indexForApi + 1 : indexForApi

      dtreeStore.openTableModal(nextStepIndex)
    }

    const getDerivedVariants = (type: string) => {
      if (!dtreeStore.isCountsReceived) return '...'

      const acceptedVariants = dtreeStore.stepData
        .map(step => !step.excluded && step.difference)
        .reduce((prev: any, curr: any) => prev + curr)

      const rejectedVariants = dtreeStore.stepData
        .map(step => step.excluded && step.difference)
        .reduce((prev: any, curr: any) => prev + curr)

      return type === 'excluded' ? rejectedVariants : acceptedVariants
    }

    return (
      <div className="flex items-center p-4 border-b border-grey-light bg-blue-dark justify-between">
        <div className="flex flex-wrap">
          <span className="font-bold text-white w-full">
            {t('dtree.results')}
          </span>

          <span className="text-12 leading-14px text-grey-blue mt-2">
            {t('ds.totalVariants')}
            {variants}
          </span>

          {toJS(dtreeStore.stepData).length > 0 && (
            <Fragment>
              <div className="text-12 leading-14px text-grey-blue mt-2 ml-2">
                <span>{t('dtree.acceptedVariants')}</span>

                <span>{getDerivedVariants('included') || 0}</span>
              </div>

              <div className="text-12 leading-14px text-grey-blue mt-2 ml-2">
                <span>{t('dtree.rejectedVariants')}</span>

                <span>{getDerivedVariants('excluded') || 0}</span>
              </div>
            </Fragment>
          )}
        </div>
        <div className="flex">
          {hasReturnedVariants && (
            <Button
              onClick={() => openTableModal(true)}
              text="View returned variants"
              hasBackground={false}
              className="ml-auto hover:bg-blue-bright"
            />
          )}

          {hasStartVariants && (
            <Button
              onClick={() => openTableModal(false)}
              text="View variants"
              hasBackground={false}
              className="ml-5 hover:bg-blue-bright"
            />
          )}
        </div>
      </div>
    )
  },
)
