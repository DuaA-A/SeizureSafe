// Due to the deprecation of the NLM RxNav Drug-Drug Interaction API on Jan 2, 2024,
// this local proxy acts as the clinical backend for graduation testing purposes.

const ENZYME_INDUCERS = ['carbamazepine', 'phenytoin', 'phenobarbital', 'primidone'];
const VALPROATES = ['valproic acid', 'valproate', 'depakine'];

const interactions = [];

// 1. Enzyme Inducers
ENZYME_INDUCERS.forEach(inducer => {
  const add = (drug, severity, description, comment) => {
    interactions.push({ drugs: [inducer, drug], severity, description, comment });
  };
  
  add('oral contraceptives', 'High', 'AED acts as an enzyme inducer, rapidly clearing birth control hormones from the blood.', 'Massive risk of unplanned pregnancy. Use non-hormonal or highly concentrated hormonal contraceptives.');
  add('warfarin', 'High', 'AED clears blood thinners too fast.', 'Severely increases the risk of deadly blood clots and strokes.');
  add('apixaban', 'High', 'AED clears blood thinners too fast.', 'Severely increases the risk of deadly blood clots and strokes.');
  add('rivaroxaban', 'High', 'AED clears blood thinners too fast.', 'Severely increases the risk of deadly blood clots and strokes.');
  add('atorvastatin', 'High', 'AED reduces efficacy of statins.', 'Monitor cholesterol and consider dose adjustments.');
  add('simvastatin', 'High', 'AED reduces efficacy of statins.', 'Monitor cholesterol and consider dose adjustments.');
  add('amlodipine', 'High', 'AED reduces efficacy of calcium channel blockers.', 'Monitor blood pressure.');
  add('diltiazem', 'High', 'AED reduces efficacy of calcium channel blockers.', 'Monitor blood pressure.');
  add('amiodarone', 'High', 'AED reduces efficacy of antiarrhythmics.', 'Monitor cardiac function.');
  add('amitriptyline', 'High', 'AED reduces efficacy of tricyclic antidepressants.', 'Monitor psychiatric symptoms.');
  add('sertraline', 'High', 'AED reduces efficacy of SSRI antidepressants.', 'Monitor psychiatric symptoms.');
  add('fluoxetine', 'High', 'AED reduces efficacy of SSRI antidepressants.', 'Monitor psychiatric symptoms.');
  add('haloperidol', 'High', 'AED reduces efficacy of antipsychotics.', 'Monitor for loss of symptom control.');
  add('quetiapine', 'High', 'AED reduces efficacy of antipsychotics.', 'Monitor for loss of symptom control.');
  add('clozapine', 'High', 'AED reduces efficacy of antipsychotics.', 'Monitor for loss of symptom control.');
  add('risperidone', 'High', 'AED reduces efficacy of antipsychotics.', 'Monitor for loss of symptom control.');
  add('doxycycline', 'High', 'AED reduces efficacy of this antibiotic.', 'Risk of treatment failure.');
  add('itraconazole', 'High', 'AED reduces efficacy of this antifungal.', 'Risk of treatment failure.');
  add('cyclosporine', 'High', 'AED rapidly clears immunosuppressants.', 'Can lead to organ rejection in transplant patients.');
  add('tacrolimus', 'High', 'AED rapidly clears immunosuppressants.', 'Can lead to organ rejection in transplant patients.');
  add('dexamethasone', 'High', 'AED drastically drops the efficacy of corticosteroids.', 'Risk of severe asthma attacks or disease flare-ups.');
  add('prednisolone', 'High', 'AED drastically drops the efficacy of corticosteroids.', 'Risk of severe asthma attacks or disease flare-ups.');
  add('cortisol', 'High', 'AED drastically drops the efficacy of corticosteroids.', 'Risk of severe asthma attacks or disease flare-ups.');
});

// 2. Enzyme Inhibitors (Valproates)
VALPROATES.forEach(valp => {
  const add = (drug, severity, description, comment) => {
    interactions.push({ drugs: [valp, drug], severity, description, comment });
  };
  
  add('lamotrigine', 'Severe', 'Valproate blocks clearance, doubling Lamotrigine levels.', 'Massive risk for Stevens-Johnson Syndrome (deadly skin-blistering disease).');
  add('phenobarbital', 'High', 'Valproate increases levels of Phenobarbital.', 'Causes severe sedation and respiratory depression.');
  add('rufinamide', 'High', 'Valproate increases levels of Rufinamide.', 'Causes severe sedation and respiratory depression.');
  add('amitriptyline', 'High', 'Valproate spikes antidepressant levels.', 'Increases risk of heart arrhythmias and severe dry mouth/constipation.');
  add('nortriptyline', 'High', 'Valproate spikes antidepressant levels.', 'Increases risk of heart arrhythmias and severe dry mouth/constipation.');
  add('cisplatin', 'High', 'Valproate increases chemotherapy agent toxicity.', 'Monitor for severe adverse effects.');
  add('etoposide', 'High', 'Valproate increases chemotherapy agent toxicity.', 'Monitor for severe adverse effects.');
  
  // Non-epilepsy disrupting valproate
  add('meropenem', 'Severe', 'Carbapenem antibiotics rapidly destroy Valproic Acid in the blood.', 'Drops AED levels to zero within hours. Triggers immediate breakthrough seizures.');
  add('imipenem', 'Severe', 'Carbapenem antibiotics rapidly destroy Valproic Acid in the blood.', 'Drops AED levels to zero within hours. Triggers immediate breakthrough seizures.');
  add('aspirin', 'High', 'High doses displace Valproic Acid from blood proteins.', 'Alters active levels, risking sudden toxicity.');
});

// 3. Non-Epilepsy Disruptions
['carbamazepine', 'phenytoin'].forEach(aed => {
  interactions.push({ drugs: [aed, 'rifampin'], severity: 'High', description: 'Rifampin flushes the AED out of the system.', comment: 'Causes sudden drop in AED levels and breakthrough seizures.' });
});

interactions.push({ drugs: ['phenytoin', 'folic acid'], severity: 'Moderate', description: 'Massive doses of Folic Acid can lower Phenytoin levels.', comment: 'Monitor Phenytoin levels to avoid breakthrough seizures.' });

['erythromycin', 'clarithromycin'].forEach(mac => {
  interactions.push({ drugs: ['carbamazepine', mac], severity: 'Severe', description: 'Macrolide antibiotics block Carbamazepine clearance.', comment: 'Causes sudden, severe Carbamazepine poisoning (double vision, vomiting, inability to walk). Strictly contraindicated.' });
});

['fluconazole', 'ketoconazole'].forEach(anti => {
  interactions.push({ drugs: ['phenytoin', anti], severity: 'High', description: 'Antifungals drastically increase Phenytoin levels.', comment: 'Monitor for Phenytoin toxicity.' });
});

['phenytoin', ...VALPROATES].forEach(aed => {
  interactions.push({ drugs: [aed, 'cimetidine'], severity: 'High', description: 'Cimetidine (Tagamet) increases levels of the AED.', comment: 'Traps AED in the blood causing toxicity.' });
});

['fluoxetine', 'fluvoxamine'].forEach(ssri => {
  interactions.push({ drugs: ['carbamazepine', ssri], severity: 'High', description: 'Antidepressants increase levels of Carbamazepine.', comment: 'Traps AED in the blood causing toxicity.' });
  interactions.push({ drugs: ['phenytoin', ssri], severity: 'High', description: 'Antidepressants increase levels of Phenytoin.', comment: 'Traps AED in the blood causing toxicity.' });
});

export const LOCAL_INTERACTION_DB = interactions;

export const checkLocalInteractions = (drugNames) => {
  const interactions = [];
  const normalizedInputs = drugNames.map(d => d.toLowerCase().trim());
  
  if (normalizedInputs.length === 1) {
    const singleDrug = normalizedInputs[0];
    const matches = LOCAL_INTERACTION_DB.filter(db => 
      db.drugs.some(d => singleDrug.includes(d) || d.includes(singleDrug))
    );
    
    matches.forEach(match => {
      // Find the other drug in the pair
      const otherDrug = match.drugs.find(d => !(singleDrug.includes(d) || d.includes(singleDrug))) || match.drugs[1];
      interactions.push({
        drugA: singleDrug.charAt(0).toUpperCase() + singleDrug.slice(1),
        drugB: otherDrug.charAt(0).toUpperCase() + otherDrug.slice(1),
        severity: match.severity,
        description: match.description,
        recommendation: match.comment
      });
    });
    
    return Array.from(new Set(interactions.map(JSON.stringify))).map(JSON.parse);
  }

  // Check every combination of standard inputs
  for (let i = 0; i < normalizedInputs.length; i++) {
    for (let j = i + 1; j < normalizedInputs.length; j++) {
      const d1 = normalizedInputs[i];
      const d2 = normalizedInputs[j];
      
      const match = LOCAL_INTERACTION_DB.find(db => 
        (db.drugs.includes(d1) && db.drugs.includes(d2)) ||
        // Check partial matches (e.g. "valproate sodium" matching "valproate")
        (db.drugs.some(base => d1.includes(base)) && db.drugs.some(base => d2.includes(base)))
      );
      
      if (match) {
        interactions.push({
          drugA: d1.charAt(0).toUpperCase() + d1.slice(1),
          drugB: d2.charAt(0).toUpperCase() + d2.slice(1),
          severity: match.severity,
          description: match.description,
          recommendation: match.comment
        });
      }
    }
  }
  
  // Remove duplicates
  return Array.from(new Set(interactions.map(JSON.stringify))).map(JSON.parse);
};
