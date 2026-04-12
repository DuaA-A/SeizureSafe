// Due to the deprecation of the NLM RxNav Drug-Drug Interaction API on Jan 2, 2024,
// this local proxy acts as the clinical backend for graduation testing purposes.

export const LOCAL_INTERACTION_DB = [
  {
    drugs: ["tramadol", "carbamazepine"],
    severity: "High",
    description: "Carbamazepine significantly increases the metabolism of tramadol, decreasing its analgesic effect. Tramadol also lowers the seizure threshold.",
    comment: "Concurrent use is generally contraindicated or requires close monitoring. Alternative analgesia is recommended."
  },
  {
    drugs: ["tramadol", "valproate"],
    severity: "Moderate",
    description: "Tramadol can lower the seizure threshold, potentially antagonizing the anticonvulsant effect of valproate.",
    comment: "Use with caution. Monitor closely for decreased seizure control."
  },
  {
    drugs: ["ibuprofen", "valproate"],
    severity: "Moderate",
    description: "Both agents can affect platelet function. Concurrent use may increase the risk of bleeding.",
    comment: "Monitor for signs of bleeding, unusual bruising, or prolonged bleeding time."
  },
  {
    drugs: ["erythromycin", "carbamazepine"],
    severity: "High",
    description: "Erythromycin inhibits CYP3A4, leading to significantly increased carbamazepine serum concentrations and severe toxicity.",
    comment: "Avoid combination. Use an alternative antibiotic like azithromycin."
  },
  {
    drugs: ["fluoxetine", "phenytoin"],
    severity: "High",
    description: "Fluoxetine inhibits the metabolism of phenytoin, potentially causing phenytoin toxicity (ataxia, nystagmus, altered mental status).",
    comment: "Phenytoin levels should be monitored closely and doses adjusted accordingly."
  },
  {
    drugs: ["clarithromycin", "carbamazepine"],
    severity: "High",
    description: "Clarithromycin inhibits CYP3A4 metabolism of carbamazepine, causing acute toxicity.",
    comment: "Avoid combination. Rapid onset of carbamazepine toxicity may occur."
  },
  {
    drugs: ["lamotrigine", "valproate"],
    severity: "High",
    description: "Valproate significantly inhibits the glucuronidation of lamotrigine, doubling its half-life and exponentially increasing the risk of life-threatening rashes (Stevens-Johnson syndrome).",
    comment: "If co-administered, lamotrigine dosage must be reduced by at least 50% and titrated extremely slowly."
  },
  {
    drugs: ["aspirin", "valproate"],
    severity: "Moderate",
    description: "Aspirin can displace valproate from protein binding sites and alter its metabolism, raising free valproate levels.",
    comment: "Monitor valproate levels and watch for valproate toxicity or bleeding."
  },
  {
    drugs: ["cimetidine", "phenytoin"],
    severity: "Moderate",
    description: "Cimetidine inhibits hepatic metabolism of phenytoin, leading to increased phenytoin levels.",
    comment: "Monitor for ataxia and nystagmus. Consider switching to famotidine."
  },
  {
    drugs: ["oral contraceptives", "carbamazepine"],
    severity: "Moderate",
    description: "Carbamazepine is a strong hepatic enzyme inducer and speeds up the metabolism of oral contraceptives, reducing their efficacy.",
    comment: "Recommend a non-hormonal form of birth control or higher-dose estrogen pills."
  },
  {
    drugs: ["topiramate", "valproate"],
    severity: "Moderate",
    description: "Co-administration has been associated with hyperammonemia with or without encephalopathy.",
    comment: "Monitor blood ammonia levels if the patient develops unexplained lethargy or vomiting."
  }
];

export const checkLocalInteractions = (drugNames) => {
  const interactions = [];
  const normalizedInputs = drugNames.map(d => d.toLowerCase().trim());
  
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
