/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

export function isBlobLike(val: unknown): val is Blob {
  if (val instanceof Blob) {
    return true;
  }

  if (typeof val !== "object" || val == null || !(Symbol.toStringTag in val)) {
    return false;
  }

  const name = val[Symbol.toStringTag];
  if (typeof name !== "string") {
    return false;
  }
  if (name !== "Blob" && name !== "File") {
    return false;
  }

  return "stream" in val && typeof val.stream === "function";
}
