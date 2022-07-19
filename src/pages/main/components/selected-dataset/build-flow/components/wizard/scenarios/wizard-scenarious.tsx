import { IWizardScenario } from '../wizard.interface'
import { wsCandidateSet } from './ws-candidate-set'
import { wsShortCandidateSet } from './ws-short-candidate-set'
import { xlCandidateSet } from './xl-candidate-set'
import { xlWholeGenome } from './xl-whole-genome'

type TWizardScenariosNames =
  | 'XlWholeGenome'
  | 'XlCandidateSet'
  | 'WsCandidateSet'
  | 'WsShortCandidateSet'

export const wizardScenarios: Record<TWizardScenariosNames, IWizardScenario[]> =
  {
    XlWholeGenome: xlWholeGenome,
    XlCandidateSet: xlCandidateSet,
    WsCandidateSet: wsCandidateSet,
    WsShortCandidateSet: wsShortCandidateSet,
  }
