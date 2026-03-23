export const DRUGS_DATA = [
  {
    id: 1,
    name: "Sodium Valproate / Valproic Acid",
    image: "/drugs/1.jpg",
    uses: "Treatment of generalized and partial epilepsy in adults and children (weighing over 20 kg) and management of manic episodes associated with bipolar disorder. Migraine prevention (off-label).",
    administration: "Swallow whole with water—do not crush or chew. Take 1–2 times daily, preferably during or after meals.",
    warning: "Do not crush or chew tablets as it destroys the sustained-release coating.",
    dosageInfo: "See doctor advice for specific dosage."
  },
  {
    id: 2,
    name: "Topiramate",
    image: "/drugs/2.jpg",
    uses: "Used alone or with other medications to treat various types of seizures (partial onset, primary generalized tonic-clonic) in adults and children 2+ years.",
    administration: "Orally, usually divided into two doses.",
    dosageInfo: "Starting: 25mg-50mg daily. Maintenance: 100mg-400mg daily. See doctor for adjustment.",
  },
  {
    id: 3,
    name: "Anticonvulsant Medication",
    image: "/drugs/3.jpeg",
    uses: "Anticonvulsant used to help control certain types of seizures in the treatment of epilepsy.",
    administration: "As prescribed by your neurologist.",
    dosageInfo: "See doctor advice."
  },
  {
    id: 4,
    name: "Levetiracetam (1000 mg)",
    image: "/drugs/4.jpeg",
    uses: "Manage partial-onset, myoclonic, or tonic-clonic seizures.",
    quantity: "20 film-coated tablets",
    administration: "Taken orally.",
    dosageInfo: "1000 mg per tablet. Consult doctor for specific frequency."
  },
  {
    id: 5,
    name: "Phenobarbital (50 mg)",
    image: "/drugs/5.jpg",
    uses: "Long-acting barbiturate used as a sedative and anticonvulsant. Prevents and controls generalized and partial seizures.",
    warning: "Habit-forming and a controlled substance due to the risk of dependence.",
    dosageInfo: "Strength: 50 mg. Consult doctor for dosage."
  }
];

export const EPILEPSY_TYPES = {
  GENERALIZED: {
    name: "Generalized Epilepsy",
    category: "Involves both hemispheres",
    symptoms: ["Loss of consciousness", "Muscle stiffening", "Rhythmic jerking"],
    treatmentIds: [1, 2, 3, 4, 5],
    lifestyle: "Focus on consistent sleep schedules and avoiding known sensory triggers."
  },
  FOCAL: {
    name: "Focal (Partial) Epilepsy",
    category: "Starts in one area of the brain",
    symptoms: ["Twitching", "Changes in sensation", "Repetitive movements"],
    treatmentIds: [1, 2, 4, 5],
    lifestyle: "Identify specific local triggers and maintain a descriptive seizure diary."
  },
  MYOCLONIC: {
    name: "Myoclonic Epilepsy",
    category: "Generalized type",
    symptoms: ["Brief, shock-like jerks", "Sudden muscle contractions"],
    treatmentIds: [4, 1],
    lifestyle: "Avoid sudden wake-ups; prioritize stress management."
  },
  UNKNOWN: {
    name: "Underspecified Seizure Patterns",
    category: "Requires further clinical diagnosis",
    symptoms: ["Mixed patterns reported", "Inconsistent frequency"],
    treatmentIds: [3],
    lifestyle: "Detailed log of all episodes is essential for your next neurologist visit."
  }
};

export const QUESTIONS = [
  {
    id: 'consciousness',
    section: 'Symptoms',
    text: 'Did the person lose consciousness?',
    icon: 'Brain',
    image: '/question_images/consciousness.png'
  },
  {
    id: 'jerking',
    section: 'Symptoms',
    text: 'Was there rhythmic jerking of limbs?',
    icon: 'Activity',
    image: '/question_images/jerking.png'
  },
  {
    id: 'stiffening',
    section: 'Symptoms',
    text: 'Did the body suddenly stiffen (tonic)?',
    icon: 'Zap',
    image: '/question_images/stiffening.png'
  },
  {
    id: 'duration',
    section: 'Symptoms',
    text: 'Did the seizure last more than 2 minutes?',
    icon: 'Clock',
    image: '/question_images/duration.png'
  }
];

export const analyzeResult = (answers) => {
  if (answers.consciousness && answers.jerking && answers.stiffening) {
    return EPILEPSY_TYPES.GENERALIZED;
  }
  if (answers.jerking && !answers.consciousness) {
    return EPILEPSY_TYPES.FOCAL;
  }
  if (answers.jerking) {
    return EPILEPSY_TYPES.MYOCLONIC;
  }
  return EPILEPSY_TYPES.UNKNOWN;
};
