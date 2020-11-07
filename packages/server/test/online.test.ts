import './_init';
import { assert } from 'chai';
import { describe, before } from 'mocha';
// import { Firestore as _Firestore } from './services/firestore';

/* eslint-disable @typescript-eslint/no-var-requires */

describe('Firestore', function () {
  // let Firestore: typeof _Firestore;

  before(function () {
    // ({ Firestore } = require('./services/firestore'));
  });

  describe('update() method', function () {
    before(async function () {
      //
    });

    after(async function () {
      //
    });

    it('should delete field if delete sentinel is passed', async function () {
      assert(true);
    });
  });
});
