import { ISolutionEntryDescription } from '@service-providers/common'

type TSolutionKind = 'preset' | 'dtree'

export interface ISolutionWithKind extends ISolutionEntryDescription {
  kind: TSolutionKind
}

export const addSolutionKind = (
  solutions: ISolutionEntryDescription[],
  kind: TSolutionKind,
): ISolutionWithKind[] => {
  return solutions.map(_solution => {
    const solution = _solution as ISolutionWithKind
    solution.kind = kind

    return solution
  })
}
