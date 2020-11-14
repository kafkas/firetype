import './_init';
import { assert } from 'chai';
import { describe, before } from 'mocha';
import { Firestore as _Firestore, User } from './services/firestore';
import { FTFieldValue } from '../lib/cjs';

/* eslint-disable @typescript-eslint/no-var-requires */

describe('Firestore', function () {
  let Firestore: typeof _Firestore;

  before(function () {
    ({ Firestore } = require('./services/firestore'));
  });

  describe('update() method', function () {
    before(async function () {
      await Firestore.collection('users')
        .doc('user_123')
        .set(
          new User('user_123', {
            firstName: 'Anar',
            username: 'kafkas',
            birthDate: Firestore.core.Timestamp.fromDate(new Date('20 Sep 1994')),
            createdAt: Firestore.core.Timestamp.fromDate(new Date()),
          })
        );
    });

    after(async function () {
      await Firestore.collection('users').doc('user_123').core.delete();
    });

    it('should delete field if delete sentinel is passed', async function () {
      await Firestore.collection('users').doc('user_123').update({
        firstName: FTFieldValue.delete(),
        birthDate: null,
      });
      const userDocSnapshot = await Firestore.collection('users').doc('user_123').coreWithConverter('set').get();

      assert.strictEqual(userDocSnapshot.id, 'user_123');
      assert.isDefined(userDocSnapshot.data());
      const user = userDocSnapshot.data()!;

      assert.isUndefined(user.firstName);
    });
  });
});
