import * as React from "react";
import { isArray, isBoolean, isNil, isNumber, isString } from "./types";

import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";
import { Callable } from "../types";

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

export interface CreateContextOptions<T> {
  strict?: boolean;
  hookName?: string;
  providerName?: string;
  errorMessage?: string;
  name?: string;
  defaultValue?: T;
}

export type CreateContextReturn<T> = [
  React.Provider<T>,
  Callable<T>,
  React.Context<T>,
];

function getContextErr(hook: string, provider: string) {
  return `${hook} returned 'undefined'. Seems you forgot to wrap component within ${provider}`;
}

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
  } = options;

  const Context = createReactContext<T | undefined>(undefined);

  Context.displayName = name;

  function useContext() {
    const context = useReactContext(Context);

    if (!context && strict) {
      const error = new Error(
        errorMessage ?? getContextErr(hookName, providerName),
      );
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
}
