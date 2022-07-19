import 'cypress-wait-until'
import { Timeouts } from '../shared/timeouts'

Cypress.Commands.add(
  'waitJob',
  (options: { jobAlias: string; interval?: number; timeout?: number }) => {
    const timeout = options?.timeout ?? Timeouts.TwentySecondsTimeout

    cy.waitUntil(
      () => {
        return cy.wait(`@${options?.jobAlias}`, { timeout }).then(res => {
          return res.response?.body[1] === 'Done'
        })
      },
      {
        interval: options?.interval ?? 1000,
        timeout,
      },
    )
  },
)
