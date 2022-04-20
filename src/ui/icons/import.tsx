import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path d="M7 12.75V9H3.25" fill="white" />
      <path d="M7 12.75V9H3.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 13.5L7 9" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10 12H13C13.1326 12 13.2598 11.9473 13.3536 11.8536C13.4473 11.7598 13.5 11.6326 13.5 11.5V3C13.5 2.86739 13.4473 2.74021 13.3536 2.64645C13.2598 2.55268 13.1326 2.5 13 2.5H4.5C4.36739 2.5 4.24021 2.55268 4.14645 2.64645C4.05268 2.74021 4 2.86739 4 3V6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  ),
}
