import { createContext, useContext, useReducer, ReactNode } from "react";
import { Element } from "../domain/types/element";
import { PeriodicTableState, PeriodicTableConfig } from "../domain/types/table";

// Estado inicial
const initialState: PeriodicTableState = {
  config: {
    showAtomicNumber: true,
    showAtomicMass: true,
    showElementName: true,
    showElementSymbol: true,
  },
  selectedElement: null,
  filteredElements: [],
  searchTerm: "",
};

// Ações
type PeriodicTableAction =
  | { type: "SET_CONFIG"; payload: Partial<PeriodicTableConfig> }
  | { type: "SELECT_ELEMENT"; payload: Element | null }
  | { type: "SET_FILTERED_ELEMENTS"; payload: Element[] }
  | { type: "SET_SEARCH_TERM"; payload: string };

// Reducer
function periodicTableReducer(
  state: PeriodicTableState,
  action: PeriodicTableAction
): PeriodicTableState {
  switch (action.type) {
    case "SET_CONFIG":
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    case "SELECT_ELEMENT":
      return {
        ...state,
        selectedElement: action.payload,
      };
    case "SET_FILTERED_ELEMENTS":
      return {
        ...state,
        filteredElements: action.payload,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
}

// Contexto
interface PeriodicTableContextType {
  state: PeriodicTableState;
  setConfig: (config: Partial<PeriodicTableConfig>) => void;
  selectElement: (element: Element | null) => void;
  setFilteredElements: (elements: Element[]) => void;
  setSearchTerm: (term: string) => void;
}

const PeriodicTableContext = createContext<
  PeriodicTableContextType | undefined
>(undefined);

// Provider
interface PeriodicTableProviderProps {
  children: ReactNode;
  initialConfig?: Partial<PeriodicTableConfig>;
}

export function PeriodicTableProvider({
  children,
  initialConfig,
}: PeriodicTableProviderProps) {
  const [state, dispatch] = useReducer(periodicTableReducer, {
    ...initialState,
    config: { ...initialState.config, ...initialConfig },
  });

  const setConfig = (config: Partial<PeriodicTableConfig>) => {
    dispatch({ type: "SET_CONFIG", payload: config });
  };

  const selectElement = (element: Element | null) => {
    dispatch({ type: "SELECT_ELEMENT", payload: element });
  };

  const setFilteredElements = (elements: Element[]) => {
    dispatch({ type: "SET_FILTERED_ELEMENTS", payload: elements });
  };

  const setSearchTerm = (term: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };

  return (
    <PeriodicTableContext.Provider
      value={{
        state,
        setConfig,
        selectElement,
        setFilteredElements,
        setSearchTerm,
      }}
    >
      {children}
    </PeriodicTableContext.Provider>
  );
}

// Hook
export function usePeriodicTable() {
  const context = useContext(PeriodicTableContext);
  if (context === undefined) {
    throw new Error(
      "usePeriodicTable deve ser usado dentro de um PeriodicTableProvider"
    );
  }
  return context;
}
