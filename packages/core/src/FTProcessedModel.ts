import type { FTCollectionModel } from '.';

export type FTProcessedModel<CM extends FTCollectionModel> = CM['model']['processed'];
