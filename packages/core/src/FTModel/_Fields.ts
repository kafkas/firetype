import type { FTCollectionModel, FTModel } from '..';

/**
 * Extracts all raw-model fields.
 */
export type Fields<CM extends FTCollectionModel> = keyof FTModel.Raw<CM>;
