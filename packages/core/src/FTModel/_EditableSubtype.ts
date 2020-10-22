import type { FTCollectionModel, FTModel } from '..';

/**
 * Extracts raw-model fields and values that are editable by clients.
 */
export type EditableSubtype<CM extends FTCollectionModel> = Omit<FTModel.Raw<CM>, FTModel.ReadonlyFields<CM>>;
