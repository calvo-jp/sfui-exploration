import * as React from "react";

export function getJsxTextContent(element: React.ReactNode): string {
  try {
    /* null, undefined, boolean */
    if (!element || typeof element === "boolean") return "";

    /* string, number */
    if (typeof element === "string" || typeof element === "number")
      return element.toString();

    /* ignore fragment */
    const children = "props" in element ? element.props.children : "";

    if (Array.isArray(children))
      return children.map(getJsxTextContent).join("").trim();
  } catch {
    /* TODO: log? */
  }

  return "";
}
