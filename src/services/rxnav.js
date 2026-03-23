const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';

export const getRxCUI = async (drugName) => {
  try {
    // Using suggest?name= for better matching
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
  if (rxcuis.length < 2) return [];
  try {
    const rxcuiList = rxcuis.join('+');
    // Using interaction/list.json?rxcuis=
    const response = await fetch(`${BASE_URL}/interaction/list.json?rxcuis=${rxcuiList}`);
    const data = await response.json();
    
    const interactions = [];
    if (!data.fullInteractionTypeGroup) return [];

    data.fullInteractionTypeGroup.forEach(group => {
      group.fullInteractionType?.forEach(type => {
        type.interactionPair?.forEach(pair => {
          interactions.push({
            severity: pair.severity === 'high' ? 'High' : pair.severity === 'moderate' ? 'Moderate' : 'Minor',
            description: pair.description,
            drugs: pair.interactionConcept.map(c => c.minConceptItem.name)
          });
        });
      });
    });

    // Remove duplicates
    const uniqueInteractions = Array.from(new Set(interactions.map(JSON.stringify))).map(JSON.parse);
    return uniqueInteractions;
  } catch (error) {
    console.error('Error fetching interactions:', error);
    return [];
  }
};
