import type { FTCollectionModel } from '@firetype/core';
import type {
  FTCollectionDescriberWithSubcollection,
  FTCollectionDescriberWithoutSubcollection,
} from '../FTCollectionDescriber';

/**
 * Contains a type guard that helps narrow down the type of the describer.
 *
 * @returns Whether a collection associated with a given describer has a subcollection.
 */
export function hasSubcollection<CM extends FTCollectionModel>(
  describer: FTCollectionDescriberWithSubcollection<CM> | FTCollectionDescriberWithoutSubcollection<CM>
): describer is FTCollectionDescriberWithSubcollection<CM> {
  return (describer as FTCollectionDescriberWithSubcollection<CM>).sub !== undefined;
}
