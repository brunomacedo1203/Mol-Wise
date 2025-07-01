import { ReactNode } from "react";

export function extractLabelText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractLabelText).join(" ");
  }
  if (typeof node === "object" && node && "props" in node) {
    // @ts-expect-error: props pode existir em ReactElement
    return extractLabelText(node.props.children);
  }
  return "";
} 