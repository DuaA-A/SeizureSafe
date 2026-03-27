const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';

const LOCAL_DRUG_DB = {
  // 🔴 Drugs that INTERACT with Antiepileptic Drugs (AEDs)
  'tramadol': { category: 'Analgesics', interact: true },
  'ibuprofen': { category: 'Analgesics', interact: true },
  'diclofenac': { category: 'Analgesics', interact: true },
  'diphenhydramine': { category: 'Antihistamines', interact: true },
  'chlorpheniramine': { category: 'Antihistamines & Cold Medications', interact: true },
  'pseudoephedrine': { category: 'Cold Medications', interact: true },
  'erythromycin': { category: 'Antibiotics', interact: true },
  'clarithromycin': { category: 'Antibiotics', interact: true },
  'ciprofloxacin': { category: 'Antibiotics', interact: true },
  'fluoxetine': { category: 'Antidepressants', interact: true },
  'paroxetine': { category: 'Antidepressants', interact: true },
  'bupropion': { category: 'Antidepressants', interact: true },
  'warfarin': { category: 'Cardiovascular Drugs', interact: true },
  'amlodipine': { category: 'Cardiovascular Drugs', interact: true },
  'oral contraceptives': { category: 'Others', interact: true },
  'omeprazole': { category: 'Others', interact: true },
  
  // 🟢 Drugs with LOW / NO Interaction
  'paracetamol': { category: 'Analgesics', interact: false },
  'loratadine': { category: 'Antihistamines', interact: false },
  'cetirizine': { category: 'Antihistamines', interact: false },
  'amoxicillin': { category: 'Antibiotics', interact: false },
  'famotidine': { category: 'GI Drugs', interact: false },
  'sertraline': { category: 'Antidepressant (Safer)', interact: false }
};

export const getRxCUI = async (drugName) => {
  const normalized = drugName.toLowerCase().trim();
  
  // 1. Intercept locally curated drugs strictly from the graduation database
  if (LOCAL_DRUG_DB[normalized]) {
    return `LOCAL_${normalized}`;
  }

  // 2. Fallback to standard RxNav API if not found in local db
  try {
    const response = await fetch(`${BASE_URL}/spellingsuggest.json?name=${encodeURIComponent(drugName)}`);
    const data = await response.json();
    const bestMatch = data.suggestionGroup?.suggestion?.[0] || drugName;

    const rxcuiResponse = await fetch(`${BASE_URL}/rxcui.json?name=${encodeURIComponent(bestMatch)}`);
    const rxcuiData = await rxcuiResponse.json();
    return rxcuiData.idGroup?.rxnormId?.[0] || null;
  } catch (error) {
    console.error('Error fetching RxCUI:', error);
    return null;
  }
};

export const getInteractions = async (rxcuis) => {
  if (rxcuis.length === 0) return [];
  
  // Separate local overrides from genuine API IDs
  const localDrugs = rxcuis.filter(r => r.startsWith('LOCAL_')).map(r => r.replace('LOCAL_', ''));
  const apiRxcuis = rxcuis.filter(r => !r.startsWith('LOCAL_'));
  
  let interactions = [];

  // Generate local clinical warnings explicitly mapped against AEDs
  if (localDrugs.length > 0) {
    localDrugs.forEach(drug => {
      const data = LOCAL_DRUG_DB[drug];
      if (data.interact) {
        interactions.push({
          severity: 'High',
          description: `Clinical Warning: ${drug.charAt(0).toUpperCase() + drug.slice(1)} (${data.category}) carries a high risk of interaction with standard Antiepileptic Drugs (AEDs).`,
          details: `Mechanism: This drug may dangerously alter seizure thresholds, reduce AED efficacy, or increase systemic toxicity.`,
          significance: `Pharmacist consultation is mandatory before dispensing to ensure patient safety and therapeutic efficacy.`,
          drugs: [drug.charAt(0).toUpperCase() + drug.slice(1), 'Antiepileptic Drug (AED)']
        });
      }
    });
  }

  // Only query standard NIH interactions if there are at least 2 genuine API IDs
  if (apiRxcuis.length >= 2) {
    try {
      const rxcuiList = apiRxcuis.join('+');
      const response = await fetch(`${BASE_URL}/interaction/list.json?rxcuis=${rxcuiList}`);
      const data = await response.json();
      
      if (data.fullInteractionTypeGroup) {
        data.fullInteractionTypeGroup.forEach(group => {
          group.fullInteractionType?.forEach(type => {
            type.interactionPair?.forEach(pair => {
              interactions.push({
                severity: pair.severity === 'high' ? 'High' : pair.severity === 'moderate' ? 'Moderate' : 'Minor',
                description: pair.description,
                comment: pair.comment || 'No additional clinical comments provided.',
                drugs: pair.interactionConcept.map(c => c.minConceptItem.name)
              });
            });
          });
        });
      }
    } catch (error) {
      console.error('Error fetching API interactions:', error);
    }
  }

  // Remove exact duplicates
  const uniqueInteractions = Array.from(new Set(interactions.map(JSON.stringify))).map(JSON.parse);
  return uniqueInteractions;
};
