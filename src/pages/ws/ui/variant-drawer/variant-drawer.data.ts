import {
  IVariantDrawerGridPreset,
  VariantDrawerPredefinedPresets,
} from './variant-drawer.interface'

export const defaultPresetsNames = ['List', 'Preset 1']

export const predefinedPresets: IVariantDrawerGridPreset[] = [
  {
    name: 'List',
    predefinedName: VariantDrawerPredefinedPresets.List,
  },
  {
    name: 'Preset 1',
    predefinedName: VariantDrawerPredefinedPresets.Preset1,
    layout: [
      {
        w: 2,
        h: 14,
        x: 0,
        y: 0,
        i: 'view_gen',
      },
      {
        w: 3,
        h: 15,
        x: 0,
        y: 21,
        i: 'view_transcripts',
      },
      {
        w: 1,
        h: 7,
        x: 0,
        y: 36,
        i: 'view_qsamples',
      },
      {
        w: 1,
        h: 7,
        x: 2,
        y: 0,
        i: 'view_gnomAD',
      },
      {
        w: 1,
        h: 7,
        x: 2,
        y: 7,
        i: 'view_db',
      },
      {
        w: 1,
        h: 7,
        x: 0,
        y: 14,
        i: 'view_pred',
      },
      {
        w: 1,
        h: 7,
        x: 1,
        y: 14,
        i: 'view_pharmagkb',
      },
      {
        w: 1,
        h: 7,
        x: 2,
        y: 14,
        i: 'view_genetics',
      },
      {
        w: 1,
        h: 7,
        x: 1,
        y: 36,
        i: '_main',
      },
      {
        w: 1,
        h: 7,
        x: 2,
        y: 36,
        i: 'transcripts',
      },
      {
        w: 1,
        h: 7,
        x: 0,
        y: 43,
        i: 'colocated_v',
      },
      {
        w: 2,
        h: 7,
        x: 1,
        y: 43,
        i: 'input',
      },
    ],
  },
]
