import { ReactElement } from 'react'
import styled from 'styled-components'

import { ExportTypeEnum } from '@core/enum/export-type.enum'
import { t } from '@i18n'
import operationsStore from '@store/operations'

interface Props {
  close: () => void
}

const Root = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  padding-top: 8px;
`

const StyledText = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  color: #262626;
  width: 160px;
  padding: 10px 12px;
  margin: 0;
  cursor: pointer;

  :hover {
    background-color: #def1fd;
  }
`

export const ExportPanel = ({ close }: Props): ReactElement => {
  const handleDownload = (type: ExportTypeEnum) => {
    operationsStore.exportReportAsync(type)
    close()
  }

  return (
    <Root>
      <StyledText onClick={() => handleDownload(ExportTypeEnum.Excel)}>
        {t('general.excel')}
      </StyledText>
      <StyledText onClick={() => handleDownload(ExportTypeEnum.CSV)}>
        {t('general.csv')}
      </StyledText>
    </Root>
  )
}
