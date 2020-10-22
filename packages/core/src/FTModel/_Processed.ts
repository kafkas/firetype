import type { FTCollectionModel } from '..';

/**
 * Extracts processed model.
 */
export type Processed<CM extends FTCollectionModel> = CM['model']['processed'];
