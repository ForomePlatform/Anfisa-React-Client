import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react-lite'

import { getApiUrl } from '@core/get-api-url'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import Editor from '@monaco-editor/react'
import { getMessageFromError } from '@utils/http/getMessageFromError'
import { HeaderModal } from './ui/header-modal'
import { ModalBase } from './ui/modal-base'

const fetchDtreeCheckAsync = async function (dsName: string, code: string) {
  const response = await fetch(getApiUrl(`dtree_check`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      ds: dsName,
      code,
    }),
  })

  return response
}

const emptyError = {
  error: '',
  line: 0,
  pos: 0,
}

const hasError = function (error: typeof emptyError) {
  return error.error.length > 0
}

export const ModalTextEditor = observer(
  (): ReactElement => {
    const params = useParams()
    const [checked, setChecked] = useState(true)

    const [code, setCode] = useState(dtreeStore.dtreeCode)

    useEffect(() => {
      if (dtreeStore.localDtreeCode) {
        dtreeStore.setNextDtreeCode(dtreeStore.localDtreeCode)
        setCode(dtreeStore.localDtreeCode)
        dtreeStore.resetLocalDtreeCode()
      } else {
        dtreeStore.setStartDtreeCode()
      }
    }, [])

    const [theme, setTheme] = useState('light')

    const ref = useRef(null)

    const [error, setError] = useState(emptyError)

    const handleDtreeCheckAsync = debounce(async (codeToCheck: string) => {
      setChecked(false)

      setCode(codeToCheck)

      const response = await fetchDtreeCheckAsync(
        params.get('ds') || '',
        codeToCheck,
      )

      setError(
        response.status === 500
          ? {
              error: t('dtree.expressionIsNotCorrect'),
              line: 0,
              pos: 0,
            }
          : emptyError,
      )

      if (response.ok) {
        const result = await response.json()

        setError(
          result.error
            ? {
                error: result.error,
                line: result.line as number,
                pos: result.pos as number,
              }
            : emptyError,
        )
      } else {
        const errorText = await response.text()
        const errorNormalized = getMessageFromError(errorText, response.status)

        setError({
          error: errorNormalized.message,
          line: 0,
          pos: 0,
        })
      }

      setChecked(true)
    }, 300)

    const handleDrop = () => {
      dtreeStore.setNextDtreeCode(dtreeStore.startDtreeCode)
      handleDtreeCheckAsync(dtreeStore.startDtreeCode)

      setCode(dtreeStore.startDtreeCode)
    }

    const handleDone = () => {
      if (code !== dtreeStore.dtreeCode) {
        dtreeStore.setLocalDtreeCode(code)
      }

      dtreeStore.closeModalTextEditor()
    }

    const handleSave = () => {
      dtreeStore.setNextDtreeCode(dtreeStore.startDtreeCode)

      const body = new URLSearchParams({
        ds: datasetStore.datasetName,
        code,
      })

      dtreeStore.fetchDtreeSetAsync(body)

      dtreeStore.closeModalTextEditor()
    }

    const handleChangeTheme = () => {
      setTheme(prev => {
        if (prev === 'light') return 'dark'

        return 'light'
      })
    }

    return (
      <ModalBase refer={ref} minHeight="80%" width="65%" theme={theme}>
        <HeaderModal
          groupName={t('dtree.editCurrentDecisionTreeCode')}
          handleClose={() => dtreeStore.closeModalTextEditor()}
          theme={theme}
          isTextEditor
          handleChangeTheme={handleChangeTheme}
          data-testid={'modal-header'}
        />

        <div className="flex items-center mt-1">
          {hasError(error) && (
            <div className="text-red-secondary bg-yellow-bright">
              {error.line !== 0 && error.pos !== 0
                ? `At line ${error.line} pos ${error.pos}: ${error.error}`
                : `${error.error}`}
            </div>
          )}
        </div>

        <div className="flex-1 mt-3">
          <Editor
            height="65vh"
            defaultLanguage="python"
            value={code}
            options={{
              cursorSmoothCaretAnimation: true,
            }}
            theme={theme === 'light' ? 'vs-white' : 'vs-dark'}
            onChange={(e: any) => {
              handleDtreeCheckAsync(e)
            }}
            className="shadow-dark"
          />
        </div>

        <div className="flex justify-end w-full">
          <Button
            text="Drop changes"
            size="md"
            onClick={handleDrop}
            variant={theme === 'light' ? 'secondary' : 'secondary-dark'}
          />

          <Button
            text="Done"
            size="md"
            disabled={!checked || hasError(error)}
            onClick={handleDone}
            variant={theme === 'light' ? 'secondary' : 'secondary-dark'}
            className={cn('mx-2')}
          />

          <Button
            text="Save"
            size="md"
            disabled={!checked || hasError(error)}
            onClick={handleSave}
            variant={theme === 'light' ? 'primary' : 'primary-dark'}
          />
        </div>
      </ModalBase>
    )
  },
)
