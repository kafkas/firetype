import type { FTCollectionModel, FTModel } from '..';

/**
 * Extracts raw-model fields that are editable by clients.
 */
export type EditableFields<CM extends FTCollectionModel> = keyof FTModel.EditableSubtype<CM>;
