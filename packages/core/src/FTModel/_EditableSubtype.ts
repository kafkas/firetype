import type { FTCollectionModel, FTModel } from '..';

/**
 * Extracts raw-model fields and values that are editable by clients.
 */
export type EditableSubtype<CM extends FTCollectionModel> = {
  [K in FTModel.Fields<CM>]: K extends FTModel.ReadonlyFields<CM> ? never : FTModel.Raw<CM>[K];
};
