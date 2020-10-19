import type { FTCollectionModel, FTDocumentData } from '@firetype/core';

/**
 * A stricter version of `FirebaseFirestore.FirestoreDataConverter` where
 * `RM` represents the raw model and `M` represents the main model.
 */
interface ModelConverter<RM extends FTDocumentData, M> {
  toFirestore: (modelObject: M) => RM;
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot<RM>) => M;
}

/**
 * Represents the shape of a describer for a specific collection. A collection describer contains details
 * such as model converter, read-only fields and subcollection describers.
 */
export type FTCollectionDescriber<CM extends FTCollectionModel> = 'sub' extends keyof CM
  ? FTCollectionDescriberWithSubcollection<CM>
  : FTCollectionDescriberWithoutSubcollection<CM>;

export interface FTCollectionDescriberWithoutSubcollection<CM extends FTCollectionModel> {
  converter: ModelConverter<CM['model']['raw'], CM['model']['processed']>;
  readonlyFields?: Record<keyof CM['model']['raw'], true>;
}

export interface FTCollectionDescriberWithSubcollection<CM extends FTCollectionModel>
  extends FTCollectionDescriberWithoutSubcollection<CM> {
  sub: {
    [K in keyof NonNullable<CM['sub']>]: FTCollectionDescriber<NonNullable<CM['sub']>[K]>;
  };
}
