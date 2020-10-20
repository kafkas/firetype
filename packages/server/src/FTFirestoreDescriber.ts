import type { FTFirestoreModel } from '@firetype/core';
import type { FTCollectionDescriber } from './FTCollectionDescriber';

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
 *      fromFirestore: (snapshot) => {
 *        const emailRaw = snapshot.data();
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
