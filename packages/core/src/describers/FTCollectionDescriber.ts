import type { FTCollectionModel } from '../models';
import type { FTDocumentData } from '../FTDocumentData';

/**
 * A stricter version of `FirebaseFirestore.FirestoreDataConverter` where
 * `RM` represents the raw model and `M` represents the main model.
 */
interface ModelConverter<RM extends FTDocumentData, M> {
  toFirestore: (modelObject: M) => RM;
  fromFirestore: (docData: RM | undefined) => M;
}

/**
 * Represents the shape of a describer for a specific collection. A collection describer contains details
 * such as model converter, read-only fields and subcollection describers.
 */

// TODO: This needs to be DRY.
export type FTCollectionDescriber<CM extends FTCollectionModel> = 'sub' extends keyof CM
  ? {
      converter: ModelConverter<CM['model']['raw'], CM['model']['processed']>;
      readonlyFields?: Record<keyof CM['model']['raw'], true>;
      sub: {
        [K in keyof NonNullable<CM['sub']>]: FTCollectionDescriber<NonNullable<CM['sub']>[K]>;
      };
    }
  : {
      converter: ModelConverter<CM['model']['raw'], CM['model']['processed']>;
      readonlyFields?: Record<keyof CM['model']['raw'], true>;
    };
