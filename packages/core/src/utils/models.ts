import type { FTCollectionModel, FTRawModel } from '..';
import type { Subset } from './_types';

/**
 * Extracts raw-model field keys that are read-only to clients.
 */

export type ReadonlyFieldKeys<CM extends FTCollectionModel> = keyof Subset<CM['readonlyFields'], true>;

/**
 * Extracts raw-model fields that are editable by clients.
 */
export type EditableFieldKeys<CM extends FTCollectionModel> = Exclude<keyof FTRawModel<CM>, ReadonlyFieldKeys<CM>>;

/**
 * Extracts raw-model fields and values that are editable by clients.
 */
export type EditableFields<CM extends FTCollectionModel> = {
  [K in EditableFieldKeys<CM>]: FTRawModel<CM>[K];
};
