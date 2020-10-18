/**
 * Represents a Firestore document in its raw format.
 */
export type FirestoreDocumentData = Record<string, unknown>;

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
    raw: FirestoreDocumentData;
    processed: unknown;
  };
  sub?: {
    [collectionKey: string]: FTCollectionModel;
  };
}

/**
 * Represents the data model for the entire Firestore database.
 */
export interface FTFirestoreModel {
  [collectionKey: string]: FTCollectionModel;
}
