import type { FTDocumentData } from '../FTDocumentData';

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
  sub?: {
    [collectionKey: string]: FTCollectionModel;
  };
}