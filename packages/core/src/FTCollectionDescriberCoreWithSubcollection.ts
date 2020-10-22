import type {
  FTEnvironment,
  FTCollectionModel,
  FTCollectionDescriberCore,
  FTCollectionDescriberCoreWithoutSubcollection,
} from '.';

export interface FTCollectionDescriberCoreWithSubcollection<E extends FTEnvironment, CM extends FTCollectionModel>
  extends FTCollectionDescriberCoreWithoutSubcollection<E, CM> {
  sub: {
    [K in keyof NonNullable<CM['sub']>]: FTCollectionDescriberCore<E, NonNullable<CM['sub']>[K]>;
  };
}
