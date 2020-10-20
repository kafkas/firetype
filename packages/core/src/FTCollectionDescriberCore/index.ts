import type { FTCollectionModel, FTEnvironment } from '..';
import type { FTCollectionDescriberCoreWithSubcollection } from './_WithSubcollection';
import type { FTCollectionDescriberCoreWithoutSubcollection } from './_WithoutSubcollection';

export type FTCollectionDescriberCore<E extends FTEnvironment, CM extends FTCollectionModel> = 'sub' extends keyof CM
  ? FTCollectionDescriberCoreWithSubcollection<E, CM>
  : FTCollectionDescriberCoreWithoutSubcollection<E, CM>;
