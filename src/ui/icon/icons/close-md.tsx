import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path d="M4 4L12 12" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 4L4 12" strokeWidth="1" strokeLinecap="round" />
    </Fragment>
  ),
}
