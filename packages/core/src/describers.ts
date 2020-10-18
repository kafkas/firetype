import type { FTCollectionModel, FTFirestoreModel, FirestoreDocumentData } from './models';

/**
 * A stricter version of `FirebaseFirestore.FirestoreDataConverter` where
 * `RM` represents the raw model and `M` represents the main model.
 */
interface ModelConverter<RM extends FirestoreDocumentData, M> {
  toFirestore: (modelObject: M) => RM;
  fromFirestore: (docData: RM) => M;
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

/**
 * Represents the shape of the describer for the entire Firestore database. The describer should be
 * created once and cached for later use.
 *
 * @example
 * ```
 * // Declare your data model which must adhere to `FTFirestoreModel`
 * interface DataModel {
 *   emails: {
 *     model: {
 *       raw: EmailDoc;
 *       processed: Email;
 *     };
 *   };
 *   // ... other collections
 * }
 *
 * // Create the describer
 * const describer: FTFirestoreDescriber<DataModel> = {
 *  emails: {
 *    converter: {
 *      toFirestore: (email) => ({
 *        // email is an Email object so email.to and email.from are well-typed.
 *        from: email.from,
 *        to: email.to
 *      }),
 *      fromFirestore: (emailRaw) => {
 *        // emailRaw is an EmailDoc object so email.to and email.from are well-typed.
 *        return new Email(emailRaw.from, emailRaw.to);
 *      },
 *    },
 *  },
 * };
 * ```
 */
export type FTFirestoreDescriber<FM extends FTFirestoreModel> = {
  [K in keyof FM]: FTCollectionDescriber<FM[K]>;
};
