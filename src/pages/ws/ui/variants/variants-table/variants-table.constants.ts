import {
  FilterCell,
  GeneCell,
  InSilicoCell,
  IVariantsTableColumn,
  PopulationCell,
  ProteinChangeCell,
  SamplesCell,
  TagsCell,
  VariantCell,
} from './components'

export const columnDefs: IVariantsTableColumn[] = [
  {
    name: 'gene',
    title: 'mainTable.gene',
    component: GeneCell,
    width: 150,
    isSticky: true,
  },
  {
    name: 'variant',
    title: 'mainTable.variant',
    component: VariantCell,
    width: 150,
    isSticky: true,
  },
  {
    name: 'tags',
    title: 'mainTable.tags',
    component: TagsCell,
    width: 230,
    grow: 2,
  },
  {
    name: 'proteinChange',
    title: 'mainTable.proteinChange',
    component: ProteinChangeCell,
    width: 150,
    grow: 0.1,
  },
  {
    name: 'inSilico',
    title: 'mainTable.inSilico',
    component: InSilicoCell,
    width: 150,
    grow: 0.1,
  },
  {
    name: 'population',
    title: 'mainTable.population',
    component: PopulationCell,
    width: 150,
  },
  {
    name: 'samples',
    title: 'mainTable.samples',
    component: SamplesCell,
    width: 270,
    grow: 10,
  },
  {
    name: 'filter',
    title: 'mainTable.filter',
    component: FilterCell,
    width: 150,
  },
]

export const columnsForDrawer = columnDefs.slice(0, 2)
