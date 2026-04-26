// ============================================================
// LOCAL CLINICAL INTERACTIONS DATABASE - FULL REBUILD
// Covers all 12 drug families, alias normalization included.
// ============================================================

export const DRUG_ALIASES = {
  // CCBs
  'diltiazem': 'diltiazem', 'altiazem': 'diltiazem',
  'verapamil': 'verapamil', 'isoptin': 'verapamil',
  'amlodipine': 'amlodipine', 'norvasc': 'amlodipine',
  // St. John's Wort
  "st john's wort": 'stjohnswort', 'st johns wort': 'stjohnswort',
  'st john wort': 'stjohnswort', 'hypericum': 'stjohnswort',
  'safra': 'stjohnswort', 'stjohn': 'stjohnswort',
  // Theophylline
  'theophylline': 'theophylline', 'aminophylline': 'theophylline',
  'quibron': 'theophylline', 'minophylline': 'theophylline',
  // Metronidazole
  'metronidazole': 'metronidazole', 'flagyl': 'metronidazole',
  'amrizole': 'metronidazole',
  // INH / TB
  'isoniazid': 'isoniazid', 'inh': 'isoniazid',
  // Antipsychotics
  'clozapine': 'clozapine', 'leponex': 'clozapine', 'safinase': 'clozapine',
  'haloperidol': 'haloperidol', 'haldol': 'haloperidol',
  'chlorpromazine': 'chlorpromazine', 'neurazine': 'chlorpromazine',
  'quetiapine': 'quetiapine', 'seroquel': 'quetiapine',
  'risperidone': 'risperidone', 'risperdal': 'risperidone',
  // Diuretics
  'furosemide': 'furosemide', 'lasix': 'furosemide',
  'hydrochlorothiazide': 'hydrochlorothiazide', 'hctz': 'hydrochlorothiazide',
  'ezidrex': 'hydrochlorothiazide',
  // OPIOIDS - Seizure Threshold Lowering
  'tramadol': 'tramadol', 'tramal': 'tramadol', 'amadol': 'tramadol',
  'pethidine': 'pethidine', 'meperidine': 'pethidine',
  'fentanyl': 'fentanyl', 'morphine': 'morphine',
  'codeine': 'codeine',
  // Antiemetics
  'metoclopramide': 'metoclopramide', 'primperan': 'metoclopramide',
  // SSRIs / SNRIs
  'fluoxetine': 'fluoxetine', 'prozac': 'fluoxetine', 'philozac': 'fluoxetine',
  'fluvoxamine': 'fluvoxamine', 'faverin': 'fluvoxamine',
  'sertraline': 'sertraline', 'lustral': 'sertraline',
  'paroxetine': 'paroxetine',
  // Antifungals
  'fluconazole': 'fluconazole', 'diflucan': 'fluconazole',
  'itraconazole': 'itraconazole', 'sporanox': 'itraconazole',
  'ketoconazole': 'ketoconazole',
  // Statins
  'atorvastatin': 'atorvastatin', 'lipitor': 'atorvastatin', 'ator': 'atorvastatin',
  'simvastatin': 'simvastatin', 'zocor': 'simvastatin',
  'rosuvastatin': 'rosuvastatin', 'crestor': 'rosuvastatin',
  // Immunosuppressants
  'cyclosporine': 'cyclosporine', 'sandimmun': 'cyclosporine',
  'tacrolimus': 'tacrolimus', 'prograf': 'tacrolimus',
  'prednisolone': 'prednisolone', 'hostacortin': 'prednisolone',
  // Hormones / Contraceptives
  'oral contraceptives': 'oralcontraceptives', 'birth control': 'oralcontraceptives',
  'contraceptive pill': 'oralcontraceptives', 'yasmin': 'oralcontraceptives',
  'microvlar': 'oralcontraceptives',
  'levothyroxine': 'levothyroxine', 'eltroxin': 'levothyroxine', 'synthroid': 'levothyroxine',
  // Allopurinol
  'allopurinol': 'allopurinol', 'zyloric': 'allopurinol', 'no-uric': 'allopurinol',
  // Carbapenems
  'meropenem': 'meropenem', 'meronem': 'meropenem',
  'imipenem': 'imipenem',
  // Macrolides
  'erythromycin': 'erythromycin', 'clarithromycin': 'clarithromycin',
  // Blood thinners
  'warfarin': 'warfarin', 'coumadin': 'warfarin',
  // Rifampicin
  'rifampicin': 'rifampicin', 'rifampin': 'rifampicin', 'rifadin': 'rifampicin',
  // AEDs - Old Gen
  'carbamazepine': 'carbamazepine', 'tegretol': 'carbamazepine',
  'phenytoin': 'phenytoin', 'epanutin': 'phenytoin', 'dilantin': 'phenytoin',
  'valproate': 'valproate', 'valproic acid': 'valproate',
  'depakine': 'valproate', 'depakote': 'valproate', 'sodium valproate': 'valproate',
  'phenobarbital': 'phenobarbital', 'phenobarbitone': 'phenobarbital', 'sominal': 'phenobarbital',
  'primidone': 'primidone',
  'oxcarbazepine': 'oxcarbazepine', 'trileptal': 'oxcarbazepine',
  // AEDs - New Gen
  'levetiracetam': 'levetiracetam', 'keppra': 'levetiracetam',
  'gabapentin': 'gabapentin', 'neurontin': 'gabapentin',
  'lamotrigine': 'lamotrigine', 'lamictal': 'lamotrigine',
  'topiramate': 'topiramate', 'topamax': 'topiramate',
  'lacosamide': 'lacosamide', 'vimpat': 'lacosamide',
};

export const normalize = (name) => {
  const lower = name.toLowerCase().trim();
  if (DRUG_ALIASES[lower]) return DRUG_ALIASES[lower];
  for (const alias of Object.keys(DRUG_ALIASES)) {
    if (lower.includes(alias) || alias.includes(lower)) return DRUG_ALIASES[alias];
  }
  return lower;
};

const OLD_GEN_AEDS = ['carbamazepine','phenytoin','valproate','phenobarbital','primidone','oxcarbazepine'];
const NEW_GEN_AEDS = ['levetiracetam','gabapentin','lamotrigine','topiramate','lacosamide'];

// Drugs that are DANGEROUS FOR EPILEPSY PATIENTS regardless of co-medication
// They lower the seizure threshold or are contraindicated.
export const SEIZURE_RISK_DRUGS = {
  tramadol: {
    severity: 'Critical',
    description: 'interactions.desc.tramadolAED',
    recommendation: 'interactions.comment.tramadolAED',
    mechanism: 'interactions.mechanism.tramadolAED',
    demographics: {
      general: 'interactions.demo.tramadolAED.general',
      senior: 'interactions.demo.tramadolAED.senior',
      pregnant: 'interactions.demo.tramadolAED.pregnant',
    },
    emergency: 'interactions.emergency.tramadolAED',
  },
  pethidine: {
    severity: 'Critical',
    description: 'interactions.desc.tramadolAED',
    recommendation: 'interactions.comment.tramadolAED',
    mechanism: 'interactions.mechanism.tramadolAED',
    demographics: { general: 'interactions.demo.tramadolAED.general', senior: 'interactions.demo.tramadolAED.senior' },
    emergency: 'interactions.emergency.tramadolAED',
  },
  fentanyl: {
    severity: 'Critical',
    description: 'interactions.desc.tramadolAED',
    recommendation: 'interactions.comment.tramadolAED',
    mechanism: 'interactions.mechanism.tramadolAED',
    demographics: { general: 'interactions.demo.tramadolAED.general' },
    emergency: 'interactions.emergency.tramadolAED',
  },
  metoclopramide: {
    severity: 'High',
    description: 'interactions.desc.metoclopramideAED',
    recommendation: 'interactions.comment.metoclopramideAED',
    mechanism: 'interactions.mechanism.metoclopramideAED',
    demographics: { child: 'interactions.demo.metoclopramideAED.child', pregnant: 'interactions.demo.metoclopramideAED.pregnant' },
    emergency: 'interactions.emergency.metoclopramideAED',
  },
  clozapine: {
    severity: 'Critical',
    description: 'interactions.desc.psyCarba',
    recommendation: 'interactions.comment.psyCarba',
    mechanism: 'interactions.mechanism.psyCarba',
    demographics: { general: 'interactions.demo.psyCarba.general', senior: 'interactions.demo.psyCarba.senior' },
    emergency: 'interactions.emergency.psyCarba',
  },
  chlorpromazine: {
    severity: 'High',
    description: 'interactions.desc.psyCarba',
    recommendation: 'interactions.comment.psyCarba',
    mechanism: 'interactions.mechanism.psyCarba',
    demographics: { general: 'interactions.demo.psyCarba.general' },
    emergency: 'interactions.emergency.psyCarba',
  },
};

// ============================================================
// PAIR INTERACTION DATABASE
// ============================================================
const mkInter = (pair, severity, desc, rec, mech, demo, emrg) => ({
  pair, severity,
  description: desc, recommendation: rec,
  mechanism: mech, demographics: demo, emergency: emrg,
});

const INTERACTION_DB = [
  // 1. CCBs + Carbamazepine
  ...['diltiazem','verapamil'].map(ccb => mkInter(
    [ccb,'carbamazepine'], 'Critical',
    'interactions.desc.ccbCarba','interactions.comment.ccbCarba',
    'interactions.mechanism.ccbCarba',
    { female:'interactions.demo.ccbCarba.female', senior:'interactions.demo.ccbCarba.senior', child:'interactions.demo.ccbCarba.child' },
    'interactions.emergency.ccbCarba'
  )),

  // 2. St. John's Wort + All Old-Gen AEDs
  ...OLD_GEN_AEDS.map(aed => mkInter(
    ['stjohnswort', aed], 'High',
    'interactions.desc.stJohnsAED','interactions.comment.stJohnsAED',
    'interactions.mechanism.stJohnsAED',
    { female:'interactions.demo.stJohnsAED.female', male:'interactions.demo.stJohnsAED.male', pregnant:'interactions.demo.stJohnsAED.pregnant' },
    'interactions.emergency.stJohnsAED'
  )),

  // 3. Theophylline + Carbamazepine / Phenytoin
  ...['carbamazepine','phenytoin'].map(aed => mkInter(
    ['theophylline', aed], 'High',
    'interactions.desc.theoAED','interactions.comment.theoAED',
    'interactions.mechanism.theoAED',
    { child:'interactions.demo.theoAED.child', senior:'interactions.demo.theoAED.senior', pregnant:'interactions.demo.theoAED.pregnant' },
    'interactions.emergency.theoAED'
  )),

  // 4. Metronidazole + Phenytoin / Carbamazepine
  ...['phenytoin','carbamazepine'].map(aed => mkInter(
    ['metronidazole', aed], 'High',
    'interactions.desc.metroPheny','interactions.comment.metroPheny',
    'interactions.mechanism.metroPheny',
    { child:'interactions.demo.metroPheny.child', pregnant:'interactions.demo.metroPheny.pregnant' },
    'interactions.emergency.metroPheny'
  )),

  // 5. Isoniazid + Phenytoin / Carbamazepine / Valproate
  ...['phenytoin','carbamazepine','valproate'].map(aed => mkInter(
    ['isoniazid', aed], 'Critical',
    'interactions.desc.inhAED','interactions.comment.inhAED',
    'interactions.mechanism.inhAED',
    { genetic:'interactions.demo.inhAED.genetic', child:'interactions.demo.inhAED.child' },
    'interactions.emergency.inhAED'
  )),

  // 6. Antipsychotics + Carbamazepine
  ...['clozapine','haloperidol','chlorpromazine','quetiapine','risperidone'].map(psy => mkInter(
    [psy, 'carbamazepine'],
    psy === 'clozapine' ? 'Critical' : 'High',
    'interactions.desc.psyCarba','interactions.comment.psyCarba',
    'interactions.mechanism.psyCarba',
    { general:'interactions.demo.psyCarba.general', senior:'interactions.demo.psyCarba.senior' },
    'interactions.emergency.psyCarba'
  )),

  // 7. Diuretics + Carbamazepine / Oxcarbazepine
  ...['furosemide','hydrochlorothiazide'].flatMap(diu =>
    ['carbamazepine','oxcarbazepine'].map(aed => mkInter(
      [diu, aed], 'High',
      'interactions.desc.diuAED','interactions.comment.diuAED',
      'interactions.mechanism.diuAED',
      { senior:'interactions.demo.diuAED.senior', female:'interactions.demo.diuAED.female' },
      'interactions.emergency.diuAED'
    ))
  ),

  // 8. SSRIs + AEDs (Enzyme Inhibitors)
  ...['fluoxetine','fluvoxamine','sertraline','paroxetine'].flatMap(ssri =>
    ['phenytoin','carbamazepine'].map(aed => mkInter(
      [ssri, aed], 'High',
      'interactions.desc.ssriAED','interactions.comment.ssriAED',
      'interactions.mechanism.ssriAED',
      { female:'interactions.demo.ssriAED.female' },
      'interactions.emergency.ssriAED'
    ))
  ),

  // 9. Azole Antifungals + Phenytoin / Carbamazepine
  ...['fluconazole','itraconazole','ketoconazole'].flatMap(azole =>
    ['phenytoin','carbamazepine'].map(aed => mkInter(
      [azole, aed], 'Critical',
      'interactions.desc.azoleAED','interactions.comment.azoleAED',
      'interactions.mechanism.azoleAED',
      { female:'interactions.demo.azoleAED.female', senior:'interactions.demo.azoleAED.senior' },
      'interactions.emergency.azoleAED'
    ))
  ),

  // 10. Statins + AEDs (Enzyme Inducers reduce statin levels)
  ...['atorvastatin','simvastatin'].flatMap(statin =>
    ['carbamazepine','phenytoin','phenobarbital'].map(aed => mkInter(
      [statin, aed], 'High',
      'interactions.desc.statinAED','interactions.comment.statinAED',
      'interactions.mechanism.statinAED',
      { senior:'interactions.demo.statinAED.senior', general:'interactions.demo.statinAED.general' },
      'interactions.emergency.statinAED'
    ))
  ),

  // 11. Immunosuppressants + AEDs
  ...['cyclosporine','tacrolimus','prednisolone'].flatMap(immuno =>
    ['carbamazepine','phenytoin','phenobarbital'].map(aed => mkInter(
      [immuno, aed], 'Critical',
      'interactions.desc.immunoAED','interactions.comment.immunoAED',
      'interactions.mechanism.immunoAED',
      { child:'interactions.demo.immunoAED.child', general:'interactions.demo.immunoAED.general' },
      'interactions.emergency.immunoAED'
    ))
  ),

  // 12. Oral Contraceptives / Levothyroxine + AEDs
  ...['carbamazepine','phenytoin','phenobarbital','oxcarbazepine'].map(aed => mkInter(
    ['oralcontraceptives', aed], 'High',
    'interactions.desc.contraAED','interactions.comment.contraAED',
    'interactions.mechanism.contraAED',
    { female:'interactions.demo.contraAED.female' },
    'interactions.emergency.contraAED'
  )),
  ...['carbamazepine','phenytoin','phenobarbital'].map(aed => mkInter(
    ['levothyroxine', aed], 'High',
    'interactions.desc.thyroxineAED','interactions.comment.thyroxineAED',
    'interactions.mechanism.thyroxineAED',
    { female:'interactions.demo.thyroxineAED.female' },
    'interactions.emergency.thyroxineAED'
  )),

  // 13. Allopurinol + AEDs
  ...['carbamazepine','phenytoin','valproate'].map(aed => mkInter(
    ['allopurinol', aed], 'Moderate',
    'interactions.desc.allopurinolAED','interactions.comment.allopurinolAED',
    'interactions.mechanism.allopurinolAED',
    { male:'interactions.demo.allopurinolAED.male', senior:'interactions.demo.allopurinolAED.senior' },
    'interactions.emergency.allopurinolAED'
  )),

  // 14. Carbapenems destroy Valproate
  ...['meropenem','imipenem'].map(carb => mkInter(
    [carb, 'valproate'], 'Critical',
    'interactions.desc.carbapenemValp','interactions.comment.carbapenemValp',
    'interactions.mechanism.carbapenemValp',
    { child:'interactions.demo.carbapenemValp.child', general:'interactions.demo.carbapenemValp.general' },
    'interactions.emergency.carbapenemValp'
  )),

  // 15. Valproate + Lamotrigine (SJS Risk)
  mkInter(['valproate','lamotrigine'], 'Severe',
    'interactions.desc.valpLamot','interactions.comment.valpLamot',
    'interactions.mechanism.valpLamot',
    { child:'interactions.demo.valpLamot.child', female:'interactions.demo.valpLamot.female' },
    'interactions.emergency.valpLamot'
  ),

  // 16. Macrolides + Carbamazepine
  ...['erythromycin','clarithromycin'].map(mac => mkInter(
    [mac, 'carbamazepine'], 'Severe',
    'interactions.desc.ccbCarba','interactions.comment.ccbCarba',
    'interactions.mechanism.ccbCarba',
    { child:'interactions.demo.ccbCarba.child', senior:'interactions.demo.ccbCarba.senior' },
    'interactions.emergency.ccbCarba'
  )),

  // 17. Rifampicin + AEDs (inducer on inducer)
  ...['carbamazepine','phenytoin','valproate'].map(aed => mkInter(
    ['rifampicin', aed], 'High',
    'interactions.desc.stJohnsAED','interactions.comment.stJohnsAED',
    'interactions.mechanism.stJohnsAED',
    { general:'interactions.demo.oldGenGeneric.general' },
    'interactions.emergency.stJohnsAED'
  )),

  // 18. Warfarin + AEDs
  ...['carbamazepine','phenytoin','phenobarbital'].map(aed => mkInter(
    ['warfarin', aed], 'High',
    'interactions.desc.reducedEfficacy','interactions.comment.bloodThinners',
    'interactions.mechanism.oldGenGeneric',
    { senior:'interactions.demo.diuAED.senior' },
    'interactions.emergency.oldGenGeneric'
  )),

  // 19. Tramadol + AEDs (pairwise for when user types both)
  ...OLD_GEN_AEDS.concat(NEW_GEN_AEDS).map(aed => mkInter(
    ['tramadol', aed], 'Critical',
    'interactions.desc.tramadolAED','interactions.comment.tramadolAED',
    'interactions.mechanism.tramadolAED',
    { general:'interactions.demo.tramadolAED.general', senior:'interactions.demo.tramadolAED.senior', pregnant:'interactions.demo.tramadolAED.pregnant' },
    'interactions.emergency.tramadolAED'
  )),

  // 20. Valproate + Aspirin
  mkInter(['valproate','aspirin'], 'High',
    'interactions.desc.aspirinValproate','interactions.comment.aspirinValproate',
    'interactions.mechanism.oldGenGeneric',
    { senior:'interactions.demo.diuAED.senior' },
    'interactions.emergency.oldGenGeneric'
  ),
];

export const LOCAL_INTERACTION_DB = INTERACTION_DB;

// ============================================================
// MAIN CHECK FUNCTION
// ============================================================
export const checkLocalInteractions = (drugNames) => {
  const results = [];
  const canonicals = drugNames.map(d => ({ original: d, canon: normalize(d) }));

  // 1. Check every pair for known interactions
  for (let i = 0; i < canonicals.length; i++) {
    for (let j = i + 1; j < canonicals.length; j++) {
      const a = canonicals[i];
      const b = canonicals[j];
      const matches = INTERACTION_DB.filter(db => {
        const [p1, p2] = db.pair;
        return (p1 === a.canon && p2 === b.canon) || (p1 === b.canon && p2 === a.canon);
      });
      matches.forEach(match => {
        results.push({
          drugA: a.original.charAt(0).toUpperCase() + a.original.slice(1),
          drugB: b.original.charAt(0).toUpperCase() + b.original.slice(1),
          severity: match.severity,
          description: match.description,
          recommendation: match.recommendation,
          mechanism: match.mechanism,
          demographics: match.demographics,
          emergency: match.emergency,
        });
      });
    }
  }

  // 2. Check single-drug seizure-risk flags (e.g. Tramadol alone)
  canonicals.forEach(({ original, canon }) => {
    const isAlreadyInResults = results.some(r =>
      r.drugA.toLowerCase() === original.toLowerCase() ||
      r.drugB.toLowerCase() === original.toLowerCase()
    );
    if (!isAlreadyInResults && SEIZURE_RISK_DRUGS[canon]) {
      const risk = SEIZURE_RISK_DRUGS[canon];
      results.push({
        drugA: original.charAt(0).toUpperCase() + original.slice(1),
        drugB: 'Epilepsy Patients (General)',
        severity: risk.severity,
        description: risk.description,
        recommendation: risk.recommendation,
        mechanism: risk.mechanism,
        demographics: risk.demographics,
        emergency: risk.emergency,
      });
    }
  });

  // 3. Generic old-gen AED flag for unmatched AEDs
  canonicals.forEach(({ original, canon }) => {
    const isOldGen = OLD_GEN_AEDS.includes(canon);
    const isNewGen = NEW_GEN_AEDS.includes(canon);
    const hasMatch = results.some(r =>
      r.drugA.toLowerCase() === original.toLowerCase() ||
      r.drugB.toLowerCase() === original.toLowerCase()
    );
    if (!hasMatch && canonicals.length > 1) {
      if (isOldGen) {
        results.push({
          drugA: original.charAt(0).toUpperCase() + original.slice(1),
          drugB: 'Other Hepatic Drugs',
          severity: 'High',
          description: 'interactions.desc.oldGenGeneric',
          recommendation: 'interactions.comment.oldGenGeneric',
          mechanism: 'interactions.mechanism.oldGenGeneric',
          demographics: { general: 'interactions.demo.oldGenGeneric.general' },
          emergency: 'interactions.emergency.oldGenGeneric',
        });
      } else if (isNewGen) {
        results.push({
          drugA: original.charAt(0).toUpperCase() + original.slice(1),
          drugB: 'Most Drugs',
          severity: 'Low',
          description: 'interactions.desc.newGenGeneric',
          recommendation: 'interactions.comment.newGenGeneric',
          mechanism: 'interactions.mechanism.newGenGeneric',
          demographics: { senior: 'interactions.demo.newGenGeneric.senior' },
          emergency: '',
        });
      }
    }
  });

  return results;
};
