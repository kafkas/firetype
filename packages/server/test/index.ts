import { resolve as resolvePath } from 'path';
import firebaseFunctionsTest from 'firebase-functions-test';

export const test = firebaseFunctionsTest(
  {
    databaseURL: 'https://firetype-tests.firebaseio.com',
    storageBucket: 'firetype-tests.appspot.com',
    projectId: 'firetype-tests',
  },
  resolvePath(__dirname, '../../../serviceAccountKey.json')
);
