import type {
  FTCollectionModel,
  FTCollectionDescriberCore,
  FTCollectionDescriberWithSubcollectionCore,
  FTCollectionDescriberWithoutSubcollectionCore,
} from '@firetype/core';

/**
 * Represents the shape of a describer for a specific collection. A collection describer contains details
 * such as model converter, read-only fields and subcollection describers.
 */
export type FTCollectionDescriber<CM extends FTCollectionModel> = FTCollectionDescriberCore<'server', CM>;

export type FTCollectionDescriberWithSubcollection<
  CM extends FTCollectionModel
> = FTCollectionDescriberWithSubcollectionCore<'server', CM>;

export type FTCollectionDescriberWithoutSubcollection<
  CM extends FTCollectionModel
> = FTCollectionDescriberWithoutSubcollectionCore<'server', CM>;
