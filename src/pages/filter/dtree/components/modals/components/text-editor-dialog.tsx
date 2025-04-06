import { ReactElement, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react-lite'

import { getApiUrl } from '@core/get-api-url'
import { useParams } from '@core/hooks/use-params'
import { LocalStoreManager } from '@core/storage-management/local-store-manager'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Dialog } from '@ui/dialog'
import { IBaseDialogProps } from '@ui/dialog/dialog.interface'
import { DecisionTreeModalDataCy } from '@data-testid'
import Editor from '@monaco-editor/react'
import { IDtreeCheck } from '@service-providers/decision-trees/decision-trees.interface'
import { getMessageFromError } from '@utils/http/getMessageFromError'

const TEXT_EDITOR_THEME = 'textEditorTheme'

export type TEditorTheme = 'light' | 'dark'

const fetchDtreeCheckAsync = async function (dsName: string, code: string) {
  const response = await fetch(getApiUrl('dtree_check'), {
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
  severity: 0,
}

const errorSeverity = function (error: typeof emptyError) {
  return error.severity
}

export const TextEditorDialog = observer(
  ({ isOpen, onClose }: IBaseDialogProps): ReactElement => {
    const params = useParams()
    const [checked, setChecked] = useState(true)

    const [code, setCode] = useState(
      dtreeStore.dtreeCode || dtreeStore.localDtreeCode,
    )

    useEffect(() => {
      if (isOpen) {
        if (dtreeStore.localDtreeCode) {
          setCode(dtreeStore.localDtreeCode)
          dtreeStore.resetLocalDtreeCode()
        } else {
          dtreeStore.setStartDtreeCode()
          setCode(dtreeStore.dtreeCode)
          setError(emptyError)
        }
      }
    }, [isOpen])

    const [theme, setTheme] = useState<TEditorTheme>(
      LocalStoreManager.read<TEditorTheme>(TEXT_EDITOR_THEME) || 'light',
    )

    const [error, setError] = useState(emptyError)

    const handleDtreeCheckAsync = debounce(async (codeToCheck: string) => {
      setChecked(false)

      setCode(codeToCheck)

      const response = await fetchDtreeCheckAsync(
        params.get('ds') || '',
        codeToCheck,
      )

      if (response.status === 500) {
        setError({
          error: t('dtree.expressionIsNotCorrect'),
          line: 0,
          pos: 0,
          severity: 0,
        })
      } else if (response.ok) {
        const result: IDtreeCheck = await response.json()

        if (result.error) {
          setError({
            error: result.error,
            line: result.line as number,
            pos: result.pos as number,
            severity: 2,
          })
        } else if (result.warnings) {
          setError({
            error: result.warnings[0].error,
            line: result.warnings[0].line,
            pos: 0,
            severity: 1,
          })
        } else {
          setError(emptyError)
        }
      } else {
        const errorText = await response.text()
        const errorNormalized = getMessageFromError(errorText, response.status)

        setError({
          error: errorNormalized.message,
          line: 0,
          pos: 0,
          severity: 2,
        })
      }

      setChecked(true)
    }, 300)

    const handleDrop = () => {
      handleDtreeCheckAsync(dtreeStore.startDtreeCode)

      setCode(dtreeStore.startDtreeCode)
    }

    const handleDone = () => {
      if (code !== dtreeStore.dtreeCode) {
        dtreeStore.setLocalDtreeCode(code)
      }

      onClose()
    }

    const handleSave = () => {
      dtreeStore.fetchDtreeSetAsync({
        ds: datasetStore.datasetName,
        code,
      })

      onClose()
    }

    const handleChangeTheme = () => {
      setTheme(prev => {
        const themeToChange: TEditorTheme = prev === 'light' ? 'dark' : 'light'

        LocalStoreManager.write(TEXT_EDITOR_THEME, themeToChange)

        return themeToChange
      })
    }

    const Controls = (): ReactElement => (
      <>
        <Button
          text="Drop changes"
          size="md"
          onClick={handleDrop}
          variant={theme === 'light' ? 'secondary' : 'secondary-dark'}
        />

        <Button
          text="Done"
          size="md"
          disabled={!checked || errorSeverity(error) > 1}
          onClick={handleDone}
          variant={theme === 'light' ? 'secondary' : 'secondary-dark'}
        />

        <Button
          text="Save"
          size="md"
          disabled={!checked || errorSeverity(error) > 1}
          onClick={handleSave}
          variant={theme === 'light' ? 'primary' : 'primary-dark'}
        />
      </>
    )

    const errClassName =
      error.severity === 2
        ? 'text-red-secondary bg-yellow-bright'
        : error.severity === 1
        ? 'text-grey-dark bg-yellow-bright'
        : ''

    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title={t('dtree.editCurrentDecisionTreeCode')}
        isApplyDisabled={!checked || errorSeverity(error) > 1}
        width="xl"
        data-testid={DecisionTreeModalDataCy.modalHeader}
        handleChangeTheme={handleChangeTheme}
        theme={theme}
        style={{ top: '50%' }}
        actions={<Controls />}
      >
        <div className="flex items-center">
          {errorSeverity(error) > 0 && (
            <div className={errClassName}>
              {(error.line !== 0 ? `At line ${error.line}` : '') +
                (error.line * error.pos !== 0 ? ` pos ${error.pos}` : '') +
                (error.line !== 0 ? ': ' : '') +
                error.error}
            </div>
          )}
        </div>

        <div className="mt-1 overflow-hidden">
          <Editor
            height="65vh"
            defaultLanguage="python"
            value={code}
            options={{
              cursorSmoothCaretAnimation: true,
              minimap: {
                showSlider: 'always',
              },
            }}
            theme={theme === 'light' ? 'vs-white' : 'vs-dark'}
            onChange={(e: any) => {
              handleDtreeCheckAsync(e)
            }}
            className="border border-grey-blue"
          />
        </div>
      </Dialog>
    )
  },
)
