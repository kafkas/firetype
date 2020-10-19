import type { FTCollectionModel } from '@firetype/core';
import type {
  FTCollectionDescriberWithSubcollection,
  FTCollectionDescriberWithoutSubcollection,
} from '../FTCollectionDescriber';

export function hasSubcollection<CM extends FTCollectionModel>(
  describer: FTCollectionDescriberWithSubcollection<CM> | FTCollectionDescriberWithoutSubcollection<CM>
): describer is FTCollectionDescriberWithSubcollection<CM> {
  return (describer as FTCollectionDescriberWithSubcollection<CM>).sub !== undefined;
}
