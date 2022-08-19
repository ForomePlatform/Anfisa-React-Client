export const en = {
  general: {
    exportReport: 'Export report',
    tags: 'Tag(s)',
    excel: 'Excel',
    csv: 'Csv',
    noResultsFound: 'No results found',
    noResultsFoundByFilters:
      'There are no results. Try to reset filters and try again',
    resetFilters: 'Reset filters',
    selectAll: 'Select All',
    clearAll: 'Clear All',
    selected: '{value} Selected',
    cancel: 'Cancel',
    create: 'Create',
    apply: 'Apply',
    applyFilters: 'Apply Filters',
    clear: 'Clear',
    replace: 'Replace',
    add: '+\u00a0Add',
    filter: '+ Filter',
    presetCreated: 'Preset has been created',
    showLess: 'Show less',
    delete: 'Delete',
    save: 'Save',
    total: 'Total',
    closeWindow: 'Close window',
    creaitionIsInProcess: 'Dataset creation has not been finished yet',
    selectPreset: 'Select Preset',
    plusAdd: '+Add',
  },
  header: {
    version: {
      frontend: 'Frontend: Anfisa {version}',
      backend: 'Backend: {version}',
    },
    presetAction: {
      success: {
        create: 'Preset "{presetName}" has been created',
        modify: 'Preset "{presetName}" has been modified',
        join: 'Preset "{presetName}" has been joined',
        delete: 'Preset "{presetName}" has been deleted',
      },
      error: {
        create: 'Error when creating the "{presetName}" preset',
        modify: 'Error when modifying the "{presetName}" preset',
        join: 'Error when joining the "{presetName}" preset',
        delete: 'Error when deleting the "{presetName}" preset',
      },
    },
    dtreeAction: {
      success: {
        create: 'Decision tree "{dtreeName}" has been created',
        modify: 'Decision tree "{dtreeName}" has been modified',
        delete: 'Decision tree "{dtreeName}" has been deleted',
      },
      error: {
        create: 'Error when creating the "{dtreeName}" decision tree',
        modify: 'Error when modifying the "{dtreeName}" decision tree',
        delete: 'Error when deleting the "{dtreeName}" decision tree',
      },
    },
    secondaryPlaceholder: 'secondary...',
  },
  solutionControl: {
    filterPreset: 'Filter Preset',
    decisionTree: 'Decision Tree',
    selectSolution: 'Select {controlName}',
    createEntry: 'Create {solutionName}',
    join: 'Join',
    delete: 'Delete',
    modify: 'Modify',
    createDialog: {
      title: 'Create {controlName}',
      create: 'Create',
      controlName: '{controlName} Name',
      controlNamePlaceholder: 'Enter {controlName} Name',
      solutionNameAlreadyExists:
        '{controlName} "{solutionName}" already exists',
    },
    deleteDialog: {
      title: 'Delete {controlName}',
      message:
        'Deleting a {controlName} "{solutionName}" will permanently remove it from your system.',
      cancel: 'No, Keep {controlName}',
      confirm: 'Yes, Delete {controlName}',
    },
    modifyDialog: {
      title: 'Modify {controlName}',
      message:
        'Modifying a {controlName} "{solutionName}" will permanently remove old version from your system.',
      cancel: 'Close',
      confirm: 'Modify',
    },
  },
  home: {
    title: 'Home',
    datasets: 'Datasets',
    searchForADataset: 'Search for dataset',
    name: 'Name',
    createdAt: 'Created at',
    openInViewer: 'Open',
    info: 'Info',
    general: 'General',
    base: 'Derived from {name}',
    pickDataset: 'Select dataset',
    datasetDescriptionDefault:
      'No description available at the moment. You can add description by clicking the plus icon above.',
    datasetDescriptionSaved: 'Description has been saved',
    table: 'Main Table',
    dtree: 'Decision Tree Panel',
    refiner: 'Filter Refiner',
    infoPanel: {
      title: 'Info',
      annotations: 'Annotation sources versions',
      filter: {
        filterHeader: 'Filter applied in',
        dtreeHeader: 'Decision tree code applied in',
        filterName: 'Filter name: ',
        dtreeName: 'Tree name: ',
        updated: 'updated at {at} from {from}',
        suppliedPanels: 'Supplied panels for type ',
      },
      info: {
        name: 'Name',
        kind: 'Kind',
        variants: 'Variants',
        createdAt: 'Created At',
        baseDataset: 'Base dataset',
        baseLoaded: 'Base loaded at',
        rootDataset: 'Base dataset',
      },
    },
    modals: {
      importDataset: 'Import Dataset',
      exportDataset: 'Export Dataset',
      applyTextImport: 'Import',
      applyTextExport: 'Export',
      withDocumentation: 'with documentation',
      withSupport: 'with support',
    },
    startFlow: {
      main: 'MAIN',
      startFlow: 'Start flow',
      startWith: 'Start with',
      prevWorkSection: 'In this section your previous work will be displayed',
      prevWorkWith: 'You previously worked with',
      candidateIsUnavailable: 'Existing candidates are unavailable',
      genomeIsUnavailable: 'Whole genome/exome is unavailable',
    },
    buildFlow: {
      candidateSet: 'Existing candidate sets',
      candidateName: 'Candidate set name',
      whatsNext: "What's next?",
      relevantPresets: 'Relevant presets',
      additionalPresetFilter: 'Additional preset filters',
      notApplicableForXl: 'Not applicable for XL dataset',
      simpleFilter: 'Simple Filter',
      inclusionExclusion: 'Inclusion/Exclusion Criteria',
      viewVariants: 'View Variants',
    },
  },
  ds: {
    preset: 'Preset',
    filters: 'Filters',
    results: 'Results',
    resultsFound: '{0} results found',
    tableVisualization: 'Table Visualization',
    grid: 'Grid',
    rows: 'Rows',
    searchColumns: 'Search',
    columns: 'Columns',
    customizeTable: 'Customize Table',
    macroTagging: 'Macro Tagging',
    macroTagsModal: {
      title: 'Macro Tags',
      apply: 'Action',
      placeholder: 'Tag name',
      menu: {
        apply: 'Apply to All',
        remove: 'Remove from All',
      },
      confirmDialog: {
        title: 'Confirmation',
        message: 'Delete {tag} from all genes?',
      },
      toastApplied: 'Tag has been successfully set',
      toastRemoved: 'Tag has been successfully removed',
    },
    copied: 'Copied successfully',
    editFilters: 'Edit Filters',
    gene: 'Gene',
    searchFilter: 'Search',
    searchTag: 'Search',
    searchColumn: 'Search',
    Compact: 'Compact View',
    Cozy: 'Cozy View',
    samples: 'Samples',
    geneList: 'Gene\u00a0List',
    sample: 'Sample',
    tags: 'Tag',
    edit: 'Edit',
    notMode: 'NOT Mode',
    variantsWithNotesOnly: 'Variants with notes only',
    tooMuchVariants:
      'There are too many variants to export. The number of variants should be less than 300',
    deleteDataset: 'Delete Dataset',
    deleteDialog: {
      title: 'Delete Dataset',
      message:
        'Deleting a Dataset "{datasetName}" will permanently remove it from your system.',
      cancel: 'No, Keep Dataset',
      confirm: 'Yes, Delete Dataset',
      toastSucces: 'Dataset "{datasetName}" has been deleted.',
      toastError: 'Dataset has not been deleted.',
    },
  },
  dsCreation: {
    createDerivedDS: 'Create Derived DS',
    datasetCreation: 'Dataset Creation',
    addDatasetTitle: 'Add new dataset',
    label: 'Dataset Name:',
    attention:
      'Attention: Zone filters (Gene, Gene List, Sample, Tags) do not participate in dataset creation',
    addDataset: 'Add dataset',
    tooManyVariants: 'The number of variants should be less than 9000',
    openIt: 'Open it',
  },
  mainTable: {
    gene: 'Gene',
    variant: 'Variant',
    tags: 'Tag(s)',
    proteinChange: 'Protein Change',
    inSilico: 'In-Silico',
    population: 'Population',
    samples: 'Samples',
    filter: 'Filter',
    transcriptsNotApplicable:
      'Transcripts not applicable to this filter: {counter}',
  },
  variant: {
    genes: 'Gene(s)',
    worstAnnotation: 'Worst Annotation',
    hg19: 'hg19',
    generalInfo: 'General info',
    canonicalAnnotations: 'Canonical Annotations',
    transcript: 'Transcript',
    refSeqCanonical: 'RefSeq  (Canonical)',
    refSeqWorst: 'RefSeq  (Worst)',
    ensemblCanonical: 'Ensembl  (Canonical)',
    ensemblWorst: 'Ensembl (Worst)',
    genotype: 'Genotype',
    proband: 'Proband',
    maternal: 'Maternal',
    paternal: 'Paternal',
    geneAnnotation: 'Gene annotation',
    tags: 'Tags',
    addCustomTag: 'Add custom tag',
    tagsFor: 'Tags for {title}',
    saveTags: 'Save tags',
    notes: 'Notes',
    notesFor: 'Notes for {title}',
    tagExists: 'That tag already exists',
    showSelectionOnly: 'Show selection only',
    saveNote: 'Save note',
    noDataToShow: 'No data to show',
    textAboutSomething: 'Text about something',
    savePreset: 'Save Preset',
    searchThroughTheTabs: 'Search through the tabs',
    openInAModalWindow: 'Open in a modal window',
    openInANewTab: 'Open in a new tab',
    contextMenuPopover: {
      delete: 'Delete',
      modify: 'Modify',
    },
    actions: {
      save: 'Preset "{presetName}" has been saved',
      modify: 'Preset "{selectedPreset}" has been modified',
      delete: {
        title: 'Delete preset',
        message:
          'Deleting a preset "{selectedPreset}" will permanently remove it from your system.',
        cancel: 'No, Keep preset',
        confirm: 'Yes, Delete preset',
        success: 'Preset "{selectedPreset}" has been deleted',
      },
    },
    errors: {
      savePredefinedPresetError: '{presetName} is a predefined preset',
      presetAlreadyExists: '{presetName} already exists',
      presetIsTooLong: 'The name cannot be longer than 20 symbols',
    },
  },
  condition: {
    selectAttribute: 'Select attribute',
    backToAttribute: 'Back to Attributes List',
    saveChanges: 'Save changes',
    deleteAttribute: 'Delete attribute',
    addAttribute: '+ Add Attribute',
    addByJoining: 'Add by joining',
    noFilters: 'There are no filters to show',
  },
  numericCondition: {
    limitedRange: 'Limited range',
    upperBoundError: 'Upper bound is incorrect',
    lowerBoundError: 'Lower bound is incorrect',
    conditionError: 'Condition is incorrect',
    includeZero: 'Include 0 ({ count } variants)',
    center: 'Center',
    distance: 'Distance',
  },
  enumCondition: {
    showZeroVariants: 'Show zero variants',
    showVisually: 'Show visually',
  },
  funcCondition: {
    scenario: 'Scenario',
    locus: 'Locus',
    problemGroup: 'Problem group:',
    inheritanceMode: 'Inheritance mode',
  },
  unitsList: {
    functionalUnits: 'Functional Units',
  },
  filter: {
    applyCondition: 'Add condition',
    applyPreset: 'Apply preset',
    switcher: 'Only starts with',
    method: 'Filtering method',
    results: 'Results',
    viewVariants: 'View variants',
    selectedVariants: 'Selected variants',
    show: 'Show {amount} variants',
    variants: 'Variants: {all}',
    transcripts: 'Transcripts: {all}',
    transcribedVariants: 'Transcribed variants: {all}',
    query: 'Query',
    presetName: 'Preset name',
    presets: 'Presets',
    createPreset: '+ Create New',
    actions: 'Actions',
    searchForAField: 'Search',
    decisionTrees: 'Decision Trees',
    tooMuchVariants: 'The number of variants is more than 2600!',
    prohibitToOpen: 'You cannot open XL-dataset on Filter Refiner',
    chooseProblemGroup: 'Choose any problem group first',
    notValidName: 'Preset name is not valid',
    conditionsAdded: '{count} added',
    chart: {
      seeAll: 'See all',
      hide: 'Hide',
      total: 'Total',
      variants: '{value, plural, one {# variant} other {# variants}}',
      transcribedVariants:
        '{value, plural, one {# transcribed variant} other {# transcribed variants}}',
      transcripts: '{value, plural, one {# transcript} other {# transcripts}}',
      shownSignificantItems: 'Shown {items} significant items (total: {total})',
      noVisualRepresentation:
        "The variant you have chosen doesn't have visual representation",
    },
    delete: 'Delete',
    copy: 'Copy',
    errors: {
      loadPreset: 'Failed to load preset "{presetName}"',
      joinPreset: 'Failed to join preset "{presetName}"',
    },
    leaveConfirm: {
      title: 'Attention! All changes will be lost',
      body: 'Are you sure you want to leave the page without saving the preset?',
    },
    inactiveField: 'Inactive field',
  },
  dtree: {
    variants: 'variants',
    previewMode: 'Preview mode',
    results: 'Results',
    tree: 'Tree',
    apply: 'Apply',
    showingResultsForStep: 'Showing results for Step',
    showingResultsForFinalStep: 'Showing results for Final Step',
    excludedVariants: 'Excluded Variants',
    includedVariants: 'Included Variants',
    logScale: 'Log scale',
    step: 'Step',
    include: 'Include',
    exclude: 'Exclude',
    addStep: '+ Add Step',
    applyFilter: 'Apply Filter',
    algorithm: 'Algorithm',

    nothingSelected: 'Nothing is selected',
    addQuery: 'Add query',
    add: 'Add',

    selected: 'selected',
    replace: 'Replace',
    join: 'Join',
    joinBy: 'Join by',
    joinByAnd: 'Join by AND',
    joinByOr: 'Join by OR',
    duplicate: 'Duplicate',
    negate: 'Negate',
    delete: 'Delete',
    addStepBefore: 'Add Step Before',
    addStepAfter: 'Add Step After',
    fn: 'fn',
    all: 'All Mode',
    not: 'Not Mode',
    reset: 'Reset',
    empty: 'empty',
    split: 'Split',
    approx: 'Approx',
    state: 'State',
    locus: 'Locus',
    minimalCountsOfEventsOnCompoundRequest:
      'Minimal count of events should be more than 0',
    fullList: 'Full list',
    samples25: 'Samples-25',
    editCurrentDecisionTreeCode: 'Edit current Decision Tree code',
    expressionIsNotCorrect: 'Expression is incorrect',
    darkMode: 'dark mode',
    loading: 'Loading...',
    chooseActiveStep: 'Choose active step',
    dtreeIsEmpty: 'Decision Tree is empty',
    decisionTreeName: 'Decision Tree name',
    dtree: 'Decision Tree',
    hasBeenCreated: 'has been created',
    hasBeenDeleted: 'has been deleted',
    hasBeenModified: 'has been modified',
    loadAnyDtree: 'Load any Decision Tree first',
    noChanges: 'There are no changes in Decision Tree',
    chooseAnyTree: 'Choose any Decision Tree from the left list first',
    cantDeleteModifyDefaultTree:
      'You cannot delete or modify default Decision Trees',
    confirmClosing: 'Do you really want to close the window?',
    changesWontBeSaved: 'This action will drop all your changes',
    totalVariants: 'Total variants: { value, number }',
    totalTranscribedVariants: 'Total transcribed variants: { value, number }',
    accepted: 'Accepted: { value, number }',
    rejected: 'Rejected: { value, number }',
    variantsCount: '{ value, plural, one {# variant} other {# variants} }',
    finalStep: 'Final Step',
    initialStep: 'Initial Step',
    viewVariants: 'View variants',
    viewReturnedVariants: 'View returned variants',
    showReturnedVariantsForStep: 'Show {returnValue} variants for step {index}',
    dtreeDeleteConfirmation: 'Do you really want to delete this tree?',
    inactiveField: 'Inactive field',
    errors: {
      loadDtree: 'Failed to load dtree "{dtreeName}"',
    },
    textEditor: 'Text editor',
  },
  error: {
    getBack: 'Back to home',
    smthWentWrong: 'Sorry, something went wrong...',
    noFirstSymbols: 'No symbols at the first position',
    tooLongNote: 'Note is too long',
    tagNameIsTooLong: 'Tag name is too long',
    dtreeNameIsNotValid: 'Decision tree name is not valid',
    noChangesToModify: 'There are no changes to modify',
    choosePresetFirst: 'Choose preset first',
    chooseFiltersFirst: 'Choose filters first',
    cantJoinTheSamePreset: 'Cant join the same preset',
    runtimeProblem: 'Runtime problem',
  },
  igv: {
    openIgv: 'Open igv',
    filesNotFound: 'Files not found',
  },
  notFound: {
    somethingIsWrong: 'Something is wrong',
    info: 'The page you are looking for was moved, removed, renamed or might never existed',
  },
  viewVariants: {
    fullList: 'Full list',
    samples25: 'Samples-25',
    gene: 'Gene',
    variant: 'Variant',
  },
  paginationList: {
    footer: '{ from } — { to } / { length }',
  },

  dashboard: {
    dashboard: 'Dashboard',
    showInCharts: 'Show in charts',
    searchForAField: 'Search for a field',
    shownFirst40: 'Shown first 40 of {variantsLeft} variants',
    emptyCondition: 'Empty condition',
  },
}
