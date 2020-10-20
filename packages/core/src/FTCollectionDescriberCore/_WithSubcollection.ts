import type { FTCollectionModel, FTEnvironment } from '..';
import type { FTCollectionDescriberCore } from '.';
import type { FTCollectionDescriberCoreWithoutSubcollection } from './_WithoutSubcollection';

export interface FTCollectionDescriberCoreWithSubcollection<E extends FTEnvironment, CM extends FTCollectionModel>
  extends FTCollectionDescriberCoreWithoutSubcollection<E, CM> {
  sub: {
    [K in keyof NonNullable<CM['sub']>]: FTCollectionDescriberCore<E, NonNullable<CM['sub']>[K]>;
  };
}
