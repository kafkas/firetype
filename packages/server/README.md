# Firetype Server

Firetype is a lightweight TypeScript library that lets you strictly type your Firebase architecture.

Firetype Server wraps the Firebase [Admin](https://github.com/firebase/firebase-admin-node) and [Cloud Functions](https://github.com/firebase/firebase-functions) SDKs in a way that lets you provide a set of types describing your data so you can prevent bugs, errors and crashes at compile time. It remembers the "schema" that you feed to it and stops you from writing bad code. This, combined with the ease with which it lets you bring changes to your codebase, provides a great developer experience.

<p>
    <a href="https://npmjs.com/package/@firetype/server" alt="Version">
        <img src="https://img.shields.io/npm/v/@firetype/server" /></a>
    <a href="https://npmjs.com/package/@firetype/server" alt="Size">
        <img src="https://img.shields.io/bundlephobia/min/@firetype/server" /></a>
    <a href="https://" alt="Types">
        <img src="https://img.shields.io/npm/types/@firetype/server" /></a>  
    <a href="https://" alt="Last Commit">
        <img src="https://img.shields.io/github/last-commit/kafkas/firetype" /></a>
    <a href="https://npmjs.com/package/@firetype/server" alt="Downloads">
        <img src="https://img.shields.io/npm/dm/@firetype/server" /></a>
</p>

## Installation

If you haven't already installed `firebase-admin` and `firebase-functions`, run

```
npm install firebase-admin firebase-functions
```

Then,

```
npm install @firetype/server
```

## Quick Start

Consider a simple `emails` collection that needs to be typed. The first thing we need to do is to create an interface that describes an email doc in this collection. Create a new file (perhaps `services/firestore.ts`) where you'll add all this information.

```ts
import type { firestore } from 'firebase-admin';

interface EmailDoc {
  from: string;
  to: string | string[];
  subject?: string;
  sentAt: firestore.Timestamp;
}
```

This represents the shape of an arbitrary email doc exactly how it is stored in Firestore. The `subject` field is optional, i.e. it may be missing from the Firestore document. Note that a field with a `null` value is different from a "missing" field.

To use email objects inside our application, we probably want to process them so need to have a model (class, interface etc.) that we'll use throughout the app. You can keep using `EmailDoc` if you think you don't need such a model.

```ts
class Email {
  constructor(public readonly id: string, private readonly raw: EmailDoc) {}

  get from() {
    return this.raw.from;
  }

  get to() {
    return this.raw.to;
  }

  get subject() {
    return this.raw.subject;
  }

  get sentAt() {
    return this.raw.sentAt.toDate();
  }

  describe() {
    return `Email sent by ${this.from} at ${this.sentAt.toUTCString()}.`;
  }
}
```

We combine these two models into an interface which needs to extend [`FTCollectionModel`](../core/src/FTCollectionModel.ts)

```ts
interface EmailsCollectionModel {
  model: {
    raw: EmailDoc;
    processed: Email;
  };
}
```

We also add an interface describing our entire Firestore model, which needs to extend [`FTFirestoreModel`](../core/src/FTFirestoreModel.ts)

```ts
interface FirestoreModel {
  emails: EmailsCollectionModel;
}
```

The key that you choose (in our case `emails`) will be the Firestore key associated with the collection.

We now have one final task, which is to create our Firestore **describer** that consists of one **collection describer**. A collection describer is an object that contains details such as model converters and subcollection describers (see [`FTCollectionDescriber`](src/FTCollectionDescriber.ts.ts))

```ts
import type { FTFirestoreDescriber } from '@firetype/server';

const describer: FTFirestoreDescriber<FirestoreModel> = {
  emails: {
    converter: {
      fromFirestore: snap => {
        return new Email(snap.id, snap.data());
      },
      toFirestore: {
        set: email => ({
          from: email.from,
          to: email.to,
          subject: email.subject ?? 'Some Topic',
          sentAt: email.sentAt,
        }),
        setMerge: email =>
          removeUndefinedFields({
            from: email.from,
            to: email.to,
            subject: email.subject,
            sentAt: email.sentAt,
          }),
      },
    },
  },
};
```

Our describer has 3 converters:

1. `fromFirestore`: Processes a raw email that we get from Firestore (e.g. in `where()` query or `documentRef.get()` method).
2. `toFirestore.set`: Converts a processed email to a raw one which can be sent to Firestore (e.g. in `set()` (without merge) and `add()` methods).
3. `toFirestore.setMerge`: Converts a partial processed email to a raw object which can be sent to Firestore in `setMerge()` method.

The describer needs to be created only once and cached for later use. You don't need to interact with it. You just pass it to Firetype and get an `FTFirestore` instance which you'll use throughout your application.

```ts
import { FTFirestore } from '@firetype/server';

export const Firestore = new FTFirestore<FirestoreModel>(describer);
```

Putting everything together we have the following

```ts
import type { firestore } from 'firebase-admin';
import { FTFirestore, FTFirestoreDescriber } from '@firetype/server';

interface EmailDoc {
  from: string;
  to: string | string[];
  subject?: string;
  sentAt: firestore.Timestamp;
}

class Email {
  constructor(public readonly id: string, private readonly raw: EmailDoc) {}

  get from() {
    return this.raw.from;
  }

  get to() {
    return this.raw.to;
  }

  get subject() {
    return this.raw.subject;
  }

  get sentAt() {
    return this.raw.sentAt.toDate();
  }

  describe() {
    return `Email sent by ${this.from} at ${this.sentAt.toUTCString()}.`;
  }
}

interface EmailsCollectionModel {
  model: {
    raw: EmailDoc;
    processed: Email;
  };
}

interface FirestoreModel {
  emails: EmailsCollectionModel;
}

const describer: FTFirestoreDescriber<FirestoreModel> = {
  emails: {
    converter: {
      fromFirestore: snap => {
        return new Email(snap.id, snap.data());
      },
      toFirestore: {
        set: email => ({
          from: email.from,
          to: email.to,
          subject: email.subject ?? 'Some Topic',
          sentAt: email.sentAt,
        }),
        setMerge: email =>
          removeUndefinedFields({
            from: email.from,
            to: email.to,
            subject: email.subject,
            sentAt: email.sentAt,
          }),
      },
    },
  },
};

export const Firestore = new FTFirestore<FirestoreModel>(describer);
```

That's it! You can now use your well-typed `FTFirestore` instance to securely edit your Firestore documents and collections. While Firetype lets you strictly type your architecture, it also provides an easy way to escape strict typing. Every Firetype object that you'll be interacting with has a `.core` property which gives you access to the underlying Firebase object which is loosely typed. This is particularly useful if you're planning to migrate to Firetype over a period of time.

At this point typing our Cloud Functions is extremely easy. We just need to pass the same describer to `FTFunctions` and create an instance.

```ts
import { FTFunctions } from '@firetype/server';

export const Functions = new FTFunctions<FirestoreModel>(describer);
```

Below are a several examples that show the difference between using Firetype and raw Firebase objects.

## Examples

### Accessing a collection

```ts
// Without Firetype
firestore().collection('aNonExistentCollection'); // OK

// With Firetype
Firestore.collection('aNonExistentCollection'); // TS Error
```

### Querying for a document

```ts
// Without Firetype
firestore().collection('emails').where('aNonExistentField', '!=', 'a_value_with_incorrect_type').get(); // OK

// With Firetype
Firestore.collection('emails').where('aNonExistentField', '!=', 'a_value_with_incorrect_type').get(); // TS Error
```

### Updating a document

```ts
import { FTFieldValue } from '@firetype/server';

// Without Firetype
firestore()
  .collection('emails')
  .doc('email_id')
  .update({
    aNonExistentField: '123', // OK
    isSaved: new Date(), // OK
    lastModifiedAt: [1, 2, 3], // OK
    anOptionalField: firestore.FieldValue.delete(), // OK
  });

// With Firetype
Firestore.collection('emails')
  .doc('email_id')
  .update({
    aNonExistentField: '123', // TS Error: Field does not exist.
    isSaved: new Date(), // TS Error: Must be a boolean.
    lastModifiedAt: [1, 2, 3], // TS Error: Must be Date or Firestore.Timestamp or FTFieldValueServerTimestamp
    anOptionalField: FTFieldValue.delete(), // OK
  });
```

### Typing an onCreate trigger

```ts
// Without Firetype
const onCreateTrigger = functions.firestore.document('emails/{emailId}').onCreate(async (snap, context) => {
  const emailId = context.params.emailId; // any
  const email = snap.data(); // firestore.DocumentData
  const subject = email.subject; // any
  const sentAt = email.sentAt; // any

  await snap.ref.set({
    // Expects firestore.DocumentData
    // Can add anything you want
  });
});

// With Firetype
const onCreateTrigger = Functions.firestore
  .collection('emails')
  .genericDoc('emailId')
  .onCreate(async (snap, context) => {
    const emailId = context.params.emailId; // string
    const email = snap.data(); // Email
    const subject = email.subject; // string | undefined
    const sentAt = email.sentAt; // Date

    await snap.core.ref.set({
      // Expects EmailDoc
    });
  });
```

## API

TODO
