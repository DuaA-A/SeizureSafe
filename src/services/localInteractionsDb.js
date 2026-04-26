// Due to the deprecation of the NLM RxNav Drug-Drug Interaction API on Jan 2, 2024,
// this local proxy acts as the clinical backend for graduation testing purposes.

const OLD_GEN_AEDS = ['phenytoin', 'carbamazepine', 'valproate', 'valproic acid', 'depakine', 'tegretol', 'epanutin', 'phenobarbital', 'primidone'];
const NEW_GEN_AEDS = ['levetiracetam', 'keppra', 'gabapentin'];

const interactions = [];

const addInteraction = (drugs, severity, descKey, commentKey, details = {}) => {
  interactions.push({
    drugs: drugs.map(d => d.toLowerCase()),
    severity,
    description: descKey,
    comment: commentKey,
    mechanism: details.mechanism || '',
    demographics: details.demographics || {},
    emergency: details.emergency || ''
  });
};

// Input 1: Calcium Channel Blockers
['diltiazem', 'verapamil', 'altiazem', 'isoptin'].forEach(ccb => {
  ['carbamazepine', 'tegretol'].forEach(aed => {
    addInteraction([ccb, aed], 'Critical', 'interactions.desc.ccbCarba', 'interactions.comment.ccbCarba', {
      mechanism: 'interactions.mechanism.ccbCarba',
      demographics: {
        female: 'interactions.demo.ccbCarba.female',
        senior: 'interactions.demo.ccbCarba.senior',
        child: 'interactions.demo.ccbCarba.child'
      },
      emergency: 'interactions.emergency.ccbCarba'
    });
  });
});

// Input 2: St. John's Wort
['st john', 'safra'].forEach(herb => {
  OLD_GEN_AEDS.forEach(aed => {
    addInteraction([herb, aed], 'High', 'interactions.desc.stJohnsAED', 'interactions.comment.stJohnsAED', {
      mechanism: 'interactions.mechanism.stJohnsAED',
      demographics: {
        female: 'interactions.demo.stJohnsAED.female',
        male: 'interactions.demo.stJohnsAED.male',
        pregnant: 'interactions.demo.stJohnsAED.pregnant'
      },
      emergency: 'interactions.emergency.stJohnsAED'
    });
  });
});

// Input 3: Theophylline
['theophylline', 'aminophylline', 'quibron', 'minophylline', 'sr theophylline'].forEach(theo => {
  ['carbamazepine', 'phenytoin', 'tegretol', 'epanutin'].forEach(aed => {
    addInteraction([theo, aed], 'High', 'interactions.desc.theoAED', 'interactions.comment.theoAED', {
      mechanism: 'interactions.mechanism.theoAED',
      demographics: {
        child: 'interactions.demo.theoAED.child',
        senior: 'interactions.demo.theoAED.senior',
        pregnant: 'interactions.demo.theoAED.pregnant'
      },
      emergency: 'interactions.emergency.theoAED'
    });
  });
});

// Input 4: Metronidazole
['metronidazole', 'flagyl', 'amrizole'].forEach(metro => {
  ['phenytoin', 'epanutin'].forEach(aed => {
    addInteraction([metro, aed], 'High', 'interactions.desc.metroPheny', 'interactions.comment.metroPheny', {
      mechanism: 'interactions.mechanism.metroPheny',
      demographics: {
        child: 'interactions.demo.metroPheny.child',
        pregnant: 'interactions.demo.metroPheny.pregnant'
      },
      emergency: 'interactions.emergency.metroPheny'
    });
  });
});

// Input 5: Tuberculosis Drugs (INH)
['isoniazid', 'inh'].forEach(tb => {
  ['phenytoin', 'carbamazepine', 'epanutin', 'tegretol'].forEach(aed => {
    addInteraction([tb, aed], 'Critical', 'interactions.desc.inhAED', 'interactions.comment.inhAED', {
      mechanism: 'interactions.mechanism.inhAED',
      demographics: {
        genetic: 'interactions.demo.inhAED.genetic',
        child: 'interactions.demo.inhAED.child'
      },
      emergency: 'interactions.emergency.inhAED'
    });
  });
});

// Input 6: Antipsychotics
['clozapine', 'haloperidol', 'leponex', 'safinase', 'haldol'].forEach(psy => {
  ['carbamazepine', 'tegretol'].forEach(aed => {
    addInteraction([psy, aed], 'Critical', 'interactions.desc.psyCarba', 'interactions.comment.psyCarba', {
      mechanism: 'interactions.mechanism.psyCarba',
      demographics: {
        general: 'interactions.demo.psyCarba.general',
        senior: 'interactions.demo.psyCarba.senior'
      },
      emergency: 'interactions.emergency.psyCarba'
    });
  });
});

// Input 7: Diuretics
['furosemide', 'hydrochlorothiazide', 'lasix', 'ezidrex'].forEach(diu => {
  ['carbamazepine', 'oxcarbazepine', 'tegretol', 'trileptal'].forEach(aed => {
    addInteraction([diu, aed], 'High', 'interactions.desc.diuAED', 'interactions.comment.diuAED', {
      mechanism: 'interactions.mechanism.diuAED',
      demographics: {
        senior: 'interactions.demo.diuAED.senior',
        female: 'interactions.demo.diuAED.female'
      },
      emergency: 'interactions.emergency.diuAED'
    });
  });
});

// Generic Enzyme inducer risks
['carbamazepine', 'phenytoin', 'phenobarbital', 'tegretol', 'epanutin'].forEach(inducer => {
  addInteraction([inducer, 'oral contraceptives'], 'High', 'interactions.desc.reducedEfficacy', 'interactions.comment.contraceptives');
  addInteraction([inducer, 'warfarin'], 'High', 'interactions.desc.reducedEfficacy', 'interactions.comment.bloodThinners');
});

// Generic Valproate risks
['valproate', 'valproic acid', 'depakine'].forEach(valp => {
  addInteraction([valp, 'lamotrigine'], 'Severe', 'interactions.desc.increasedLevels', 'interactions.comment.lamotrigineSJS');
  addInteraction([valp, 'aspirin'], 'High', 'interactions.desc.aspirinValproate', 'interactions.comment.aspirinValproate');
});


export const LOCAL_INTERACTION_DB = interactions;

export const checkLocalInteractions = (drugNames, patientProfile = {}) => {
  const results = [];
  const normalizedInputs = drugNames.map(d => d.toLowerCase().trim());
  const checkedPairs = new Set();

  for (let i = 0; i < normalizedInputs.length; i++) {
    for (let j = i + 1; j < normalizedInputs.length; j++) {
      const d1 = normalizedInputs[i];
      const d2 = normalizedInputs[j];
      const pairKey = `${d1}-${d2}`;
      checkedPairs.add(d1);
      checkedPairs.add(d2);

      const match = LOCAL_INTERACTION_DB.find(db => 
        (db.drugs.includes(d1) && db.drugs.includes(d2)) ||
        (db.drugs.some(base => d1.includes(base)) && db.drugs.some(base => d2.includes(base)))
      );

      if (match) {
        results.push({
          drugA: d1.charAt(0).toUpperCase() + d1.slice(1),
          drugB: d2.charAt(0).toUpperCase() + d2.slice(1),
          severity: match.severity,
          description: match.description,
          recommendation: match.comment,
          mechanism: match.mechanism,
          demographics: match.demographics,
          emergency: match.emergency
        });
      }
    }
  }

  // General Flag Rules for drugs that didn't trigger a specific interaction
  normalizedInputs.forEach(d => {
    const isOldGen = OLD_GEN_AEDS.some(aed => d.includes(aed));
    const isNewGen = NEW_GEN_AEDS.some(aed => d.includes(aed));
    
    // Only apply generic rules if it's an AED
    if (isOldGen || isNewGen) {
      const hasSpecificInteraction = results.some(r => r.drugA.toLowerCase() === d || r.drugB.toLowerCase() === d);
      
      if (!hasSpecificInteraction && normalizedInputs.length > 1) {
        if (isOldGen) {
          results.push({
            drugA: d.charAt(0).toUpperCase() + d.slice(1),
            drugB: "Any Hepatic Drug",
            severity: "High",
            description: "interactions.desc.oldGenGeneric",
            recommendation: "interactions.comment.oldGenGeneric",
            mechanism: "interactions.mechanism.oldGenGeneric",
            demographics: { general: "interactions.demo.oldGenGeneric.general" },
            emergency: "interactions.emergency.oldGenGeneric"
          });
        } else if (isNewGen) {
          results.push({
            drugA: d.charAt(0).toUpperCase() + d.slice(1),
            drugB: "Most Drugs",
            severity: "Low",
            description: "interactions.desc.newGenGeneric",
            recommendation: "interactions.comment.newGenGeneric",
            mechanism: "interactions.mechanism.newGenGeneric",
            demographics: { senior: "interactions.demo.newGenGeneric.senior" },
            emergency: ""
          });
        }
      }
    }
  });

  return results;
};

