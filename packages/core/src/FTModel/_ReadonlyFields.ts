import type { FTCollectionModel } from '..';
import type { Subset } from '../_utils';

/**
 * Extracts raw-model field keys that are read-only to clients.
 */
export type ReadonlyFields<CM extends FTCollectionModel> = keyof Subset<CM['readonlyFields'], true>;
