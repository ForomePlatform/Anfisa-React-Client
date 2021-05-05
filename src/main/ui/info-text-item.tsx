import { CSSProperties, ReactElement, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'
import { theme } from '../../theme/theme'
import { Text } from '../../ui/text'

type Props = TextProps & {
    children?: ReactNode | string
	style?: CSSProperties
	isTitleBaseInfo?: boolean
}

interface TextProps {
	isClickable?: boolean
	isActive?: boolean
	isTitleBaseInfo?: boolean
	onClick?: () => void
}

const StyledText = styled(Text)<TextProps>`
	font-family: 'Work Sans', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
	color: ${theme('colors.black')};
	margin: 0px;
	padding: 5px 10px;

	${ifProp('isActive', css`
		background-color: #DEF1FD;
	`)}

	${ifProp('isClickable', css`
		cursor: pointer;
	`)}

	${ifProp('isTitleBaseInfo', css`
		color: #777777;
		border-bottom: 1px solid #F0F0F0;
	`)}

`

export const InfoTextItem = ({children, ...rest}: Props): ReactElement => (
	<StyledText {...rest}>{children}</StyledText>
)
