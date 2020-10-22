import type { FTCollectionModel } from '.';

export type FTRawModel<CM extends FTCollectionModel> = CM['model']['raw'];
