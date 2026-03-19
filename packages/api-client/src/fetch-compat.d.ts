/**
 * Fixes type conflict between bun-types and @types/node (undici-types).
 *
 * bun-types includes `/// <reference types="node" />`, which pulls in
 * @types/node's fetch types backed by undici-types. undici's Response.clone()
 * returns its own module-scoped Response, which is missing Bun's extra
 * Headers properties (toJSON, count, getAll). This redeclaration ensures
 * clone() returns the global (merged) Response type.
 */
interface Response {
  clone(): Response;
}
