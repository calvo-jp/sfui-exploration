import * as React from "react";
import { isArray, isBoolean, isNil, isNumber, isString } from "./is";

export function getJsxTextContent(node: React.ReactNode): string {
  try {
    if (isNil(node)) return "";
    if (isBoolean(node)) return "";
    if (isString(node)) return node;
    if (isNumber(node)) return node.toString();

    /* ignores <Fragment /> */
    const children = "props" in node ? node.props.children : "";

    if (!isArray(children)) return "";

    return children.map(getJsxTextContent).join("").trim();
  } catch {
    return "";
  }
}

export function removeParentFragment(subject: React.ReactNode) {
  return React.isValidElement(subject) && subject.type === React.Fragment
    ? subject.props.children
    : subject;
}

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[];
}
