export const EPILEPSY_TYPES = {
  FOCAL_AWARE: {
    id: 'focal_aware',
    name: 'Focal Aware Seizures',
    category: 'Focal Epilepsy',
    symptoms: ['Awareness preserved', 'Localized motor movements', 'Sensory symptoms (strange smell, taste, tingling)'],
    commonAge: 'Any age (often adults)',
    firstLineDrugs: ['Carbamazepine', 'Lamotrigine', 'Levetiracetam'],
    lifestyle: 'Avoid stress & sleep deprivation, identify and avoid individual triggers, strict adherence to medications.'
  },
  FOCAL_IMPAIRED: {
    id: 'focal_impaired',
    name: 'Focal Impaired Awareness Seizures',
    category: 'Focal Epilepsy',
    symptoms: ['Impaired consciousness', 'Automatisms (lip smacking, hand movements)', 'Postictal confusion'],
    commonAge: 'Adolescents & adults',
    firstLineDrugs: ['Carbamazepine', 'Levetiracetam'],
    lifestyle: 'Avoid stress & sleep deprivation, identify and avoid individual triggers, strict adherence to medications.'
  },
  ABSENCE: {
    id: 'absence',
    name: 'Absence Seizures',
    category: 'Generalized Epilepsy',
    symptoms: ['Brief loss of awareness (seconds)', 'Staring spells', 'No fall'],
    commonAge: 'Children (4–10 years)',
    firstLineDrugs: ['Ethosuximide', 'Valproic acid'],
    lifestyle: 'Maintain regular sleep, limit screen exposure (flashing lights), monitor school performance.'
  },
  TONIC_CLONIC: {
    id: 'tonic_clonic',
    name: 'Tonic-Clonic Seizures',
    category: 'Generalized Epilepsy',
    symptoms: ['Loss of consciousness', 'Tonic stiffening → clonic jerking', 'Tongue biting / urinary incontinence'],
    commonAge: 'Any age',
    firstLineDrugs: ['Valproic acid', 'Levetiracetam', 'Lamotrigine'],
    lifestyle: 'Avoid sleep deprivation & alcohol, take precautions during swimming/heights, ensure someone knows first aid.'
  },
  TONIC: {
    id: 'tonic',
    name: 'Tonic Seizures',
    category: 'Generalized Epilepsy',
    symptoms: ['Sudden muscle stiffening', 'Possible fall'],
    commonAge: 'Mostly children',
    firstLineDrugs: ['Valproic acid'],
    lifestyle: 'Same precautions as tonic-clonic, focus on injury prevention.'
  },
  CLONIC: {
    id: 'clonic',
    name: 'Clonic Seizures',
    category: 'Generalized Epilepsy',
    symptoms: ['Repetitive rhythmic jerking'],
    commonAge: 'Rare, usually children',
    firstLineDrugs: ['Valproic acid'],
    lifestyle: 'Same precautions as tonic-clonic, focus on injury prevention.'
  },
  MYOCLONIC: {
    id: 'myoclonic',
    name: 'Myoclonic Seizures',
    category: 'Generalized Epilepsy',
    symptoms: ['Sudden brief jerks (especially arms)'],
    commonAge: 'Adolescents',
    firstLineDrugs: ['Valproic acid', 'Levetiracetam'],
    lifestyle: 'Strongly linked to sleep deprivation, ensure good sleep routine, avoid sudden light exposure.'
  },
  ATONIC: {
    id: 'atonic',
    name: 'Atonic Seizures',
    category: 'Generalized Epilepsy',
    symptoms: ['Sudden loss of muscle tone', 'Drop attacks (sudden falls)'],
    commonAge: 'Children',
    firstLineDrugs: ['Valproic acid'],
    lifestyle: 'Use protective helmet (especially children), safe environment (avoid sharp edges).'
  },
  SYNDROMES: {
    id: 'syndromes',
    name: 'Epileptic Syndromes',
    category: 'Special Syndromes',
    symptoms: ['Combination of different seizure types', 'May include developmental delay'],
    commonAge: 'Usually childhood',
    firstLineDrugs: ['Valproic acid'],
    lifestyle: 'Monitor growth and development, may benefit from Ketogenic diet (under medical supervision).'
  }
};

export const QUESTIONS = [
  {
    id: 'age',
    text: 'What is your age?',
    type: 'number',
    section: 'Profile'
  },
  {
    id: 'awareness',
    text: 'Do you remain fully aware during the seizure?',
    type: 'boolean',
    section: 'Symptoms',
    icon: 'Activity'
  },
  {
    id: 'staring',
    text: 'Do you experience brief staring spells (just a few seconds)?',
    type: 'boolean',
    section: 'Symptoms',
    icon: 'Eye'
  },
  {
    id: 'stiffening',
    text: 'Do you experience sudden muscle stiffening?',
    type: 'boolean',
    section: 'Symptoms',
    icon: 'Zap'
  },
  {
    id: 'jerking',
    text: 'Do you experience repetitive rhythmic jerking?',
    type: 'boolean',
    section: 'Symptoms',
    icon: 'Move'
  },
  {
    id: 'muscle_tone',
    text: 'Do you experience a sudden loss of muscle tone (potentially causing falls)?',
    type: 'boolean',
    section: 'Symptoms',
    icon: 'ArrowDownCircle'
  },
  {
    id: 'automatisms',
    text: 'Do you perform automatic movements like lip smacking or hand movements?',
    type: 'boolean',
    section: 'Symptoms',
    icon: 'Hand'
  }
];

export const analyzeResult = (answers) => {
  // Simple heuristic for demonstration based on the provided data
  if (answers.staring && answers.age < 12) return EPILEPSY_TYPES.ABSENCE;
  if (answers.awareness && (answers.stiffening || answers.jerking)) return EPILEPSY_TYPES.FOCAL_AWARE;
  if (!answers.awareness && answers.automatisms) return EPILEPSY_TYPES.FOCAL_IMPAIRED;
  if (answers.stiffening && answers.jerking && !answers.awareness) return EPILEPSY_TYPES.TONIC_CLONIC;
  if (answers.muscle_tone) return EPILEPSY_TYPES.ATONIC;
  if (answers.jerking && answers.age >= 12 && answers.age <= 20) return EPILEPSY_TYPES.MYOCLONIC;
  
  return EPILEPSY_TYPES.SYNDROMES; // Default/Complex
};
