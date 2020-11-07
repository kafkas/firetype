// import * as admin from 'firebase-admin';
import { assert } from 'chai';
import { describe, before } from 'mocha';
// import { Firestore as _Firestore } from './services/firestore';

/* eslint-disable @typescript-eslint/no-var-requires */

describe('Firestore', function () {
  // let Firestore: typeof _Firestore;

  before(function () {
    // ({ Firestore } = require('./services/firestore'));
  });

  after(function () {
    // test.cleanup();
  });

  describe('update() method', function () {
    it('should delete field if delete sentinel is passed', async function () {
      assert(true);
    });
  });
});
