import type { FTCollectionModel } from '.';

/**
 * Represents the data model for the entire Firestore database.
 */
export interface FTFirestoreModel {
  [collectionKey: string]: FTCollectionModel;
}
