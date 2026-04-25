import { checkLocalInteractions, LOCAL_INTERACTION_DB } from './src/services/localInteractionsDb.js';

console.log("DB size:", LOCAL_INTERACTION_DB.length);
console.log("Test Meropenem + Depakine:", checkLocalInteractions(["Depakine", "Meropenem"]));
console.log("Test Lamotrigine + Valproic acid:", checkLocalInteractions(["Lamotrigine", "Valproic acid"]));
console.log("Test Carbamazepine + Oral contraceptives:", checkLocalInteractions(["Carbamazepine", "Oral contraceptives"]));
