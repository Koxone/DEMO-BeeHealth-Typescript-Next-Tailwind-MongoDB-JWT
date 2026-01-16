// @/lib/validations/zod.ts
import { z } from 'zod';

/**
 * Validator for Mongoose ObjectId.
 * Ensures the value is a valid 24-character hex string.
 * Turns the value into a string before validation.
 */
export const zObjectId = z.preprocess(
  (val) => val?.toString(),
  z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
);

/**
 * Validator for Date fields.
 * Ensures the value is a valid ISO 8601 date string.
 */
export const zDate = z.preprocess((val) => {
  if (val instanceof Date) return val.toISOString();
  if (typeof val === 'string') return val;
}, z.string().datetime());
