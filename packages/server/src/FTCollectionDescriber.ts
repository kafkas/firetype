import type { FTCollectionModel, FTCollectionDescriberCore } from '@firetype/core';

/**
 * Represents the shape of a describer for a specific collection. A collection describer contains details
 * such as model converter and subcollection describers.
 */
export type FTCollectionDescriber<CM extends FTCollectionModel> = FTCollectionDescriberCore<'server', CM>;
