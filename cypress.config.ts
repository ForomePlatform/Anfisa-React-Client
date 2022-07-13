import { defineConfig } from 'cypress'
import setupNodeEvents from './cypress/plugins'

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    supportFile: 'cypress/support/index.ts',
    specPattern: '**.spec.ts',
    trashAssetsBeforeRuns: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    watchForFileChanges: false,
    videoUploadOnPasses: false,

    setupNodeEvents,
  },
})
