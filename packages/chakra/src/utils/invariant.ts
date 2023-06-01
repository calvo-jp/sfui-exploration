export function invariant<T>(condition: T, message = ""): asserts condition {
  const prefix = "Invariant violation";
  const delimiter = message ? ":" : "";

  if (!condition) throw new Error(`${prefix}${delimiter}${message}`);
}
