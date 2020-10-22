import type { FTDocumentData } from '.';

/**
 * Represents the data model for a specific collection and its subcollections.
 *
 * @example
 * ```
 * interface EmailsModel {
 *   model: {
 *     raw: EmailDoc;
 *     processed: Email;
 *   };
 *   // Optional
 *   sub: { ... }
 * }
 * ```
 */
export interface FTCollectionModel {
  model: {
    raw: FTDocumentData;
    processed: unknown;
  };
  readonlyFields?: {
    [field: string]: true;
  };
  sub?: {
    [collectionKey: string]: FTCollectionModel;
  };
}
