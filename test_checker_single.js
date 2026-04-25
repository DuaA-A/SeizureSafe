import { checkLocalInteractions } from './src/services/localInteractionsDb.js';

let medsToCheck = [{name: "Meropenem"}];
const BASELINE_EPILEPSY_DRUGS = [
  "Carbamazepine",
  "Valproate",
  "Phenytoin",
  "Lamotrigine",
  "Levetiracetam",
  "Topiramate"
];

const hasEpilepsyDrug = medsToCheck.some(m => 
  BASELINE_EPILEPSY_DRUGS.some(base => base.toLowerCase() === m.name.toLowerCase())
);

let allDrugNames = medsToCheck.map(m => m.name);

if (!hasEpilepsyDrug) {
  for (const baseDrug of BASELINE_EPILEPSY_DRUGS.slice(0, 2)) { 
    allDrugNames.push(baseDrug);
  }
}

const localInteractions = checkLocalInteractions(allDrugNames);

const userMedNamesLower = medsToCheck.map(m => m.name.toLowerCase());
const localRelevantInteractions = localInteractions.filter(inter => {
  if (!hasEpilepsyDrug) {
      const drgALower = inter.drugA.toLowerCase();
      const drgBLower = inter.drugB.toLowerCase();
      return userMedNamesLower.some(umed => drgALower.includes(umed) || drgBLower.includes(umed));
  }
  return true;
});

console.log("Meropenem single drug results:", localRelevantInteractions);
