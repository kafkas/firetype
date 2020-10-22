import type { FTCollectionModel, FTModel } from '..';

/**
 * Extracts raw-model fields and values that are editable by clients.
 */
export type EditableSubtype<CM extends FTCollectionModel> = {
  [K in FTModel.EditableFields<CM>]: FTModel.Raw<CM>[K];
};
