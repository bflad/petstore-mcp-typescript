/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

/**
 * Unauthorized error
 */
export type ApiErrorUnauthorized = { status: number; error: string };

export const ApiErrorUnauthorized$zodSchema: z.ZodType<
  ApiErrorUnauthorized,
  z.ZodTypeDef,
  unknown
> = z.object({
  error: z.string(),
  status: z.number().int(),
}).describe("Unauthorized error");
