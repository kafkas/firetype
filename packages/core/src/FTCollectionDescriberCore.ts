import type {
  FTCollectionModel,
  FTEnvironment,
  FTCollectionDescriberCoreWithSubcollection,
  FTCollectionDescriberCoreWithoutSubcollection,
} from '.';

export type FTCollectionDescriberCore<E extends FTEnvironment, CM extends FTCollectionModel> = 'sub' extends keyof CM
  ? FTCollectionDescriberCoreWithSubcollection<E, CM>
  : FTCollectionDescriberCoreWithoutSubcollection<E, CM>;
