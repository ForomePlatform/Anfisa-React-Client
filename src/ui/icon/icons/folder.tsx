import { Fragment } from 'react'

const size = 16

export default {
  size,
  viewBox: { w: size, h: size },
  stroke: true,
  content: (
    <Fragment>
      <path
        d="M13.5556 13H2.46154C2.33924 12.9996 2.22205 12.9509 2.13558 12.8644C2.0491 12.7779 2.00036 12.6608 2 12.5385V5H13.5C13.6326 5 13.7598 5.05268 13.8536 5.14645C13.9473 5.24021 14 5.36739 14 5.5V12.5556C14 12.6734 13.9532 12.7865 13.8698 12.8698C13.7865 12.9532 13.6734 13 13.5556 13V13Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 5V3.5C2 3.36739 2.05268 3.24021 2.14645 3.14645C2.24021 3.05268 2.36739 3 2.5 3H5.79289C5.85855 3 5.92357 3.01293 5.98424 3.03806C6.0449 3.06319 6.10002 3.10002 6.14645 3.14645L8 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Fragment>
  ),
}
