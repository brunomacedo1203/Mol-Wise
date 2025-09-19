import common from "./common.json";

// Traduções por páginas
import home from "./pages/home.json";
import calculators from "./pages/calculators.json";
import periodicTable from "./pages/periodic-table.json";
import visualization from "./pages/visualization.json";
import catalog from "./pages/catalog.json";
import molarMass from "./pages/molar-mass.json";

// Traduções de componentes
import navigation from "./components/navigation.json";
import multiselect from "./components/multiselect.json";
import tableHeaders from "./components/table-headers.json";
import compoundTable from "./components/compound-table.json";

// Traduções legais
import privacy from "./legal/privacy.json";
import cookies from "./legal/cookies.json";
import terms from "./legal/terms.json";

// Dados e termos técnicos
import compounds from "./data/compounds.json";
import dataTerms from "./data/terms.json";
import elements from "./data/elements.json";

// Exportação consolidada - TODAS as chaves são espalhadas no nível raiz
const translations = {
  // Traduções globais
  ...common,

  // Páginas - usando spread operator para espalhar todas as chaves
  ...home,
  ...calculators,
  ...periodicTable,
  ...visualization,
  ...catalog,
  ...molarMass,

  // Componentes - usando spread operator para espalhar todas as chaves
  ...navigation,
  ...multiselect,
  ...tableHeaders,
  ...compoundTable,

  // Legal - usando spread operator para espalhar todas as chaves
  ...privacy,
  ...cookies,
  ...terms,

  // Dados - usando spread operator para espalhar todas as chaves
  ...compounds,
  ...dataTerms,
  ...elements,
};

export default translations;

// Exportações nomeadas para uso específico (mantidas para compatibilidade)
export {
  common,
  home,
  calculators,
  periodicTable,
  visualization,
  catalog,
  molarMass,
  navigation,
  multiselect,
  tableHeaders,
  compoundTable,
  privacy,
  cookies,
  terms,
  compounds,
  dataTerms,
  elements,
};