import React, { Key, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { get } from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { IGridLayout } from '@declarations'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import variantStore from '@store/variant'
import { Icon } from '@ui/icon'
import { RadioButton } from '@ui/radio-button'
import { VariantBody } from '@components/variant/ui/body'
import { GlbPagesNames } from '@glb/glb-names'
import { TCondition } from '@service-providers/common/common.interface'
import { fetchDsListAsync } from '@utils/TableModal/fetchDsListAsync'
import { fetchJobStatusAsync } from '@utils/TableModal/fetchJobStatusAsync'

const ModalView = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
`

const ModalContent = styled.div`
  width: 90%;
  min-height: 700px;
  max-height: 500px;
  .react-grid-item {
    width: calc(100% - 30px) !important;
  }
`

type VariantsSize = 'SMALL' | 'MIDDLE' | 'LARGE'

export const TableModal = observer(() => {
  const [layout, setLayout] = useState(variantStore.modalDrawerVariantsLayout)
  const [variantList, setVariantList] = useState<any>([])
  const [variantIndex, setVariantIndex] = useState(0)
  const [isSampleMode, setIsSampleMode] = useState(false)
  const [variantSize, setVariantSize] = useState<VariantsSize>()
  const ref = useRef(null)

  useEffect(() => {
    variantStore.fetchVarinatInfoForModalAsync(datasetStore.datasetName, 0)
  }, [])

  const stepIndex = dtreeStore.tableModalIndexNumber ?? 0

  useEffect(() => {
    dtreeStore.setShouldLoadTableModal(true)

    const initAsync = async () => {
      const { conditions } = filterStore

      const isRefiner = filterStore.method === GlbPagesNames.Refiner

      const requestValue = isRefiner ? conditions : stepIndex

      const result = await fetchDsListAsync(
        requestValue as number | TCondition[],
      )

      fetchJobStatusAsync(result.task_id)
    }

    initAsync()

    return () => {
      dtreeStore.clearJobStatus()
      dtreeStore.setShouldLoadTableModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jobStatus = dtreeStore.savingStatus
  const jobStatusData = jobStatus?.[0] ? jobStatus[0] : null
  const records = jobStatusData?.records
  const samples = jobStatusData?.samples
  const datasetName = datasetStore.datasetName
  const isSample = Boolean(samples)

  useEffect(() => {
    if (jobStatusData) {
      if (
        Boolean(jobStatusData['samples']) &&
        Boolean(jobStatusData['records'])
      ) {
        setVariantSize('MIDDLE')
      } else if (jobStatusData['records']) {
        setVariantSize('SMALL')
      } else {
        setVariantSize('LARGE')
      }

      setIsSampleMode(isSample)

      setVariantList(samples || records)

      const orderNumber = isSample ? samples[0]?.no ?? 0 : 0

      variantStore.fetchVarinatInfoForModalAsync(datasetName, orderNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatusData, samples])

  useEffect(() => {
    if (jobStatusData) {
      const orderNumber = isSample
        ? samples[variantIndex]?.no ?? 0
        : records[variantIndex]?.no ?? 0

      variantStore.fetchVarinatInfoForModalAsync(datasetName, orderNumber)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobStatusData, variantIndex])

  const closeModal = (event: any) => {
    if (event.currentTarget === event.target) {
      dtreeStore.closeTableModal()
    }
  }

  const isLoading = jobStatus.length === 0 || jobStatus[0] === false

  const toggleMode = () => {
    setIsSampleMode(!isSampleMode)
    const newVariantList = !isSampleMode ? samples : records

    setVariantList(newVariantList)
  }

  const onCollapse = () => {
    if (isCollapsed) {
      const parents = document.querySelectorAll('#parent')

      setLayout((prev: any[]) => {
        const newLayout = prev.map((item: any, index: number) => ({
          ...item,
          h:
            get(parents[index].children[1].firstChild, 'clientHeight', 0) *
              0.0208 +
            1.3,
          y: index,
        }))

        window.sessionStorage.setItem('gridLayout', JSON.stringify(newLayout))

        return newLayout
      })
      return
    }

    setLayout((prev: any[]) => {
      const newLayout = prev.map((item: any) => ({
        ...item,
        h: 1,
      }))

      window.sessionStorage.setItem('gridLayout', JSON.stringify(newLayout))

      return newLayout
    })
  }

  const isCollapsed = JSON.parse(
    window.sessionStorage.getItem('gridLayout') || '[]',
  ).every((el: IGridLayout) => el.h === 1)

  return (
    <ModalView className="bg-grey-blue rounded-lg" onClick={closeModal}>
      <ModalContent
        className="flex flex-col bg-white rounded-lg overflow-y-auto h-full"
        ref={ref}
      >
        {isLoading ? (
          <div className="flex w-full h-full rounded-lg items-center justify-around">
            {jobStatus[1]}
          </div>
        ) : (
          <>
            <div className="flex w-full overflow-hidden rounded-lg">
              <div className="flex flex-col rounded-l-lg overflow-auto">
                <div className="flex px-[14px] py-4">
                  <div className="flex items-center mr-[14px]">
                    <RadioButton
                      isDisabled={variantSize === 'LARGE'}
                      isChecked={!isSampleMode}
                      onChange={toggleMode}
                    />

                    <div className="ml-[6px]">{t('dtree.fullList')}</div>
                  </div>

                  <div className="flex items-center">
                    <RadioButton
                      isDisabled={variantSize === 'SMALL'}
                      isChecked={isSampleMode}
                      onChange={toggleMode}
                    />

                    <p className="ml-[6px]">{t('dtree.samples25')}</p>
                  </div>
                </div>
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-y-[0.5px] border-grey-blue">
                      <th className="px-4 py-3">Gene</th>
                      <th className="px-4 py-3">Variant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toJS(variantList).map(
                      (
                        variant: { lb: string; no: Key | null | undefined },
                        index: number,
                      ) => {
                        const parts = variant.lb
                          .split(/[[\]]/)
                          .filter(Boolean)
                          .map(el => el.trim())
                        const gene = parts[0]
                        const variantB = parts[1]
                        const active = index === variantIndex
                        return (
                          <tr
                            key={variant.no}
                            className={cn('border-y-[0.5px] border-grey-blue', {
                              'bg-blue-bright': active,
                            })}
                            onClick={() => setVariantIndex(index)}
                          >
                            <th
                              className="text-sm font-normal py-[30px] px-[16px]"
                              dangerouslySetInnerHTML={{ __html: gene }}
                            />
                            <th
                              className="text-xs font-normal py-[30px] px-[16px]"
                              dangerouslySetInnerHTML={{ __html: variantB }}
                            />
                          </tr>
                        )
                      },
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col rounded-r-lg w-full">
                <div className="flex px-4 py-2 justify-between w-full bg-blue-dark">
                  <div
                    className="flex justify-center text-16 font-semi-bold text-blue-bright"
                    dangerouslySetInnerHTML={{
                      __html: variantList[variantIndex]?.lb ?? '',
                    }}
                  />
                  <div className="flex justify-center items-center">
                    <Icon
                      name={isCollapsed ? 'Expand' : 'Collapse'}
                      onClick={onCollapse}
                      size={16}
                      className="cursor-pointer text-white"
                    />
                    <div className="bg-blue-lighter mx-3 rounded-sm w-0.5 h-[20px]" />
                    <Icon
                      name="Close"
                      onClick={() => dtreeStore.closeTableModal()}
                      size={16}
                      className="cursor-pointer text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col bg-blue-lighter w-full h-full overflow-auto">
                  <VariantBody
                    drawerWidth={window.innerWidth}
                    setLayout={setLayout}
                    layout={layout}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </ModalContent>
    </ModalView>
  )
})
