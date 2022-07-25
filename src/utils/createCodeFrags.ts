import { ICodeFrags, IDtreeSetPoint } from '@service-providers/decision-trees'

export const createCodeFrags = (points: IDtreeSetPoint[]): ICodeFrags[] => {
  const codeFrags: ICodeFrags[] = []

  points.forEach(
    (point, index) =>
      point.kind === 'If' &&
      codeFrags.push({
        condition: point['code-frag'],
        result: points[index + 1]?.['code-frag'],
        decision: points[index + 1]?.decision,
      }),
  )

  const finalStepFrag = {
    condition: '',
    result: undefined,
    decision: points[points.length - 1]?.decision,
  }

  codeFrags.push(finalStepFrag)

  return codeFrags
}
