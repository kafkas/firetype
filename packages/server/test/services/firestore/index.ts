import { FTFirestore } from '../../../src';
import { describer, FirestoreModel } from '../_describer';

export const Firestore = new FTFirestore<FirestoreModel>(describer);

export { Email, EmailDoc } from '../_describer/emails';
export { User, UserDoc } from '../_describer/users';
