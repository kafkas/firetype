import type { FTCollectionModel } from '..';

/**
 * Extracts raw model.
 */
export type Raw<CM extends FTCollectionModel> = CM['model']['raw'];
