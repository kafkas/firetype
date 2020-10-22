import type {
  FTEnvironment,
  FTCollectionModel,
  FTCollectionDescriberCoreWithSubcollection,
  FTCollectionDescriberCoreWithoutSubcollection,
} from '..';

/**
 * Contains a type guard that helps narrow down the type of the describer.
 *
 * @returns Whether a collection associated with a given describer has a subcollection.
 */
export function hasSubcollection<E extends FTEnvironment, CM extends FTCollectionModel>(
  describer: FTCollectionDescriberCoreWithSubcollection<E, CM> | FTCollectionDescriberCoreWithoutSubcollection<E, CM>
): describer is FTCollectionDescriberCoreWithSubcollection<E, CM> {
  return (describer as FTCollectionDescriberCoreWithSubcollection<E, CM>).sub !== undefined;
}
