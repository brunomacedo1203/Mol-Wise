import { MutableRefObject } from "react";

export interface MolecularFormulaInputProps {
  value?: string;
  onChange: (val: string) => void;
  onEnterPress: () => void;
  errorMessage?: string;
  resultHtml?: string;
}

export interface UseMolecularFormulaInputProps {
  value?: string;
  onChange: (val: string) => void;
  onEnterPress: () => void;
}

export interface UseMolecularFormulaInputReturn {
  isFocused: boolean;
  cursorVisible: boolean;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleContainerClick: () => void;
  shouldShowPlaceholder: boolean;
  updateFormattedContent: (rawText: string) => void;
} 