import type { FTCollectionModel } from './FTCollectionModel';

/**
 * Represents the data model for the entire Firestore database.
 */
export interface FTFirestoreModel {
  [collectionKey: string]: FTCollectionModel;
}
