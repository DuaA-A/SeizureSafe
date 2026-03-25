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
  GTCS: {
    id: 'gtcs',
    name: "Generalized Tonic-Clonic Seizure",
    description: "Involves the whole brain. Characterized by sudden loss of consciousness, body stiffening, and rhythmic jerking.",
    advice: "Pharmacist Advice: Long-term medication adherence is vital. Common medications include Valproate or Levetiracetam.",
    treatment: "First-line: Sodium Valproate (Epilim), Levetiracetam (Keppra), or Lamotrigine. Emergency: Midazolam if seizure lasts >5 mins.",
    plan: "Clinical Plan: Immediate EEG and MRI/CT recommended. Ensure safe environment during future episodes.",
    criteria: { consciousness: 'lost', movement: 'jerking_stiffening', duration: '1-3mins' }
  },
  FOCAL_AWARE: {
    id: 'focal_aware',
    name: "Focal Aware Seizure",
    description: "The person is fully aware and conscious. May experience twitching or sensory changes.",
    advice: "Pharmacist Advice: Often requires Carbamazepine or Oxcarbazepine. Monitor sensory side effects.",
    treatment: "First-line: Carbamazepine (Tegretol), Oxcarbazepine (Trileptal), or Lacosamide.",
    plan: "Clinical Plan: Document precise sensory changes. Neurological localization needed.",
    criteria: { consciousness: 'maintained', awareness: 'full' }
  },
  ABSENCE: {
    id: 'absence',
    name: "Absence Seizure",
    description: "Brief loss of consciousness, appearing as staring into space. Common in children.",
    advice: "Pharmacist Advice: Ethosuximide is the gold standard for pure absence seizures.",
    treatment: "First-line: Ethosuximide (Zarontin) or Sodium Valproate.",
    plan: "Clinical Plan: Hyperventilation trial during EEG may be requested. School notification recommended.",
    criteria: { consciousness: 'lost', duration: 'seconds', movement: 'staring' }
  },
  FOCAL_IMPAIRED: {
    id: 'focal_impaired',
    name: "Focal Impaired Awareness Seizure",
    description: "Awareness is altered. The person may perform repetitive movements (automatisms).",
    advice: "Pharmacist Advice: Lamotrigine or Levetiracetam are frequently initiated.",
    treatment: "First-line: Lamotrigine (Lamictal), Levetiracetam, or Carbamazepine.",
    plan: "Clinical Plan: Assess memory of the event. Check for temporal lobe involvement via MRI.",
    criteria: { consciousness: 'impaired', movement: 'automatisms' }
  },
  MYOCLONIC: {
    id: 'myoclonic',
    name: "Myoclonic Seizure",
    description: "Brief, shock-like jerks of a muscle or group of muscles.",
    advice: "Pharmacist Advice: Avoid sodium channel blockers (like phenytoin) as they may worsen this type.",
    treatment: "First-line: Levetiracetam, Sodium Valproate, or Clonazepam.",
    plan: "Clinical Plan: Ensure early morning safety. Sleep deprivation EEG might be useful.",
    criteria: { movement: 'brief_jerks', consciousness: 'maintained' }
  },
  ATONIC: {
    id: 'atonic',
    name: "Atonic Seizure",
    description: "Sudden loss of muscle tone causing the person to fall (drop attacks).",
    advice: "Pharmacist Advice: High risk of injury. Meds like Clobazam may be added as adjunctive therapy.",
    treatment: "First-line: Sodium Valproate, Lamotrigine, or Topiramate (Topamax).",
    plan: "Clinical Plan: Protective headgear assessment. Fall risk evaluation.",
    criteria: { movement: 'drop_collapse' }
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

/**
 * Analyzes questionnaire answers based on 6-step diagnostic criteria.
 * Steps: 
 * 1. Consciousness (Lost, Maintained, Impaired)
 * 2. Movement (Jerking, Staring, Automatisms, Brief Jerks, Collapse, None)
 * 3. Duration (Seconds, <2mins, >5mins)
 * 4. Awareness (Full, None, Partial)
 * 5. Special Features (Aura, Post-ictal confusion, etc.)
 */
export const analyzeResult = (answers) => {
  const { consciousness, movement, duration, awareness } = answers;
  
  const hasMovement = (type) => Array.isArray(movement) ? movement.includes(type) : movement === type;

  // 1. Check for Generalized Tonic-Clonic
  if (consciousness === 'lost' && (hasMovement('jerking_stiffening') || (hasMovement('jerking') && hasMovement('stiffening')))) {
    return EPILEPSY_TYPES.GTCS;
  }

  // 2. Check for Absence
  if (consciousness === 'lost' && (duration === 'seconds' || hasMovement('staring'))) {
    return EPILEPSY_TYPES.ABSENCE;
  }

  // 3. Check for Focal Aware
  if (consciousness === 'maintained' && awareness === 'full') {
    return EPILEPSY_TYPES.FOCAL_AWARE;
  }

  // 4. Check for Focal Impaired
  if (consciousness === 'impaired' || (consciousness === 'maintained' && awareness === 'partial')) {
    return EPILEPSY_TYPES.FOCAL_IMPAIRED;
  }

  // 5. Check for Myoclonic
  if (hasMovement('brief_jerks')) {
    return EPILEPSY_TYPES.MYOCLONIC;
  }

  // 6. Check for Atonic
  if (hasMovement('drop_collapse')) {
    return EPILEPSY_TYPES.ATONIC;
  }

  // Default: No specific pattern
  return {
    id: 'unknown',
    name: "Atypical/Undetermined Pattern",
    description: "The reported symptoms do not clearly match a standard epilepsy classification. This could be a non-epileptic event or a rare seizure type.",
    advice: "Pharmacist Advice: Do not start any anti-epileptic medication without a definitive diagnosis from a neurologist.",
    treatment: "Consultation required for definitive pharmacological regimen.",
    plan: "Clinical Plan: Video-EEG monitoring is the next best step. Record future events on video if safe to do so."
  };
};
