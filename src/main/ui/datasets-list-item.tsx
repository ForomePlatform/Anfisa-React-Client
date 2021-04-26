import get from 'lodash/get'
import { ReactElement, useState } from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'
import { DsDistItem } from '../../..'
import { theme } from '../../theme/theme'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import dirinfoStore from '../../store/dirinfo'
import { DatasetType } from './dataset-type'
import { observer } from 'mobx-react-lite'

interface Props {
    item: DsDistItem
	isSubItems?: boolean
}

interface RootProps {
    onClick?: () => void
    isActive?: boolean
	isSubItems?: boolean
}

const Root = styled(Box)<RootProps>`
	display: flex;
	align-items: center;
	cursor: pointer;
	flex-wrap: wrap;
	width: 100%;
	padding-right: 32px;
	
    ${ifProp('isActive', css`
		background-color: #DEF1FD;
	`)}

	${ifProp('isSubItems', css`
		padding-left: 20px;
		width: 420px;
	`)}
`

const StyledName = styled(Text)<{isActive?: boolean}>`
	font-family: 'Work Sans', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
	color: ${theme('colors.black')};
	margin-left: 10px;

	${ifProp('isActive', css`
		font-weight: bold;
	`)}
`

const StyledDate = styled(Text)`
	font-family: 'Work Sans', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
	margin-left: auto;
	color: ${theme('colors.grey.7')};
`

const DropdownFolder = styled(Box)`
	position: relative;
`

const Dropline = styled(Box)`
	background-color:#F0F0F0;
	width: 1px;
	height: 100%;
	position: absolute;
	left: 12px;
	top: 0px;
`

export const DatasetsListItem = observer(({item, isSubItems}: Props): ReactElement => {
	const [isOpenFolder, setIsOpenFolder] = useState(false)
	const isXl = item.kind === 'xl'
	const secondaryKeys: string[] = get(item, 'secondary', [])
	const isActive = item.name === dirinfoStore.selectedDirinfoName || (isXl && isOpenFolder)
	
	const handleClick = () => {
		console.log(isXl)
		if (isXl) {
			setIsOpenFolder((prev) => !prev)
		}

		dirinfoStore.setSelectedDirinfoName(item.name)
		
		if (!isXl) {
			dirinfoStore.fetchDsinfo(item.name)
		}
	}

	return (
		<>
			<Root key={item.name} onClick={handleClick} isActive={isActive && !isXl} isSubItems={isSubItems}>
				<DatasetType kind={item.kind} isActive={isActive}/>
				<StyledName isActive={isActive}>{item.name}</StyledName>
				<StyledDate >{item['upd-time']}</StyledDate>
			</Root>

			{isOpenFolder && isXl && (
				<DropdownFolder>
					<Dropline />
					<Box>
						{secondaryKeys.map((secondaryKey: string) => {
							const secondaryItem: DsDistItem = dirinfoStore.dirinfo['ds-dict'][secondaryKey]

							return (
								<DatasetsListItem item={secondaryItem} key={secondaryItem.name} isSubItems />
							)
						})}
					</Box>
				</DropdownFolder>
			)}
		</>
	)
})