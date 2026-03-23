const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';

export const getRxCUI = async (drugName) => {
  try {
    const response = await fetch(`${BASE_URL}/rxcui.json?name=${encodeURIComponent(drugName)}`);
    const data = await response.json();
    return data.idGroup?.rxnormId?.[0] || null;
  } catch (error) {
    console.error('Error fetching RxCUI:', error);
    return null;
  }
};

export const getInteractions = async (rxcuis) => {
  if (rxcuis.length < 2) return [];
  try {
    const rxcuiList = rxcuis.join('+');
    const response = await fetch(`${BASE_URL}/interaction/list.json?rxcuis=${rxcuiList}`);
    const data = await response.json();
    
    const interactions = [];
    data.fullInteractionTypeGroup?.forEach(group => {
      group.fullInteractionType?.forEach(type => {
        type.interactionPair?.forEach(pair => {
          interactions.push({
            severity: pair.severity || 'N/A',
            description: pair.description,
            drugs: pair.interactionConcept.map(c => c.minConceptItem.name)
          });
        });
      });
    });
    return interactions;
  } catch (error) {
    console.error('Error fetching interactions:', error);
    return [];
  }
};
