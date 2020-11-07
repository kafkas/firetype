import { FTFirestore } from '../../../src';
import { describer, FirestoreModel } from '../_describer';

export const Firestore = new FTFirestore<FirestoreModel>(describer);
