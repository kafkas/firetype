# Firetype Client

Firetype is a lightweight TypeScript library that lets you strictly type your Firebase architecture.

Firetype Client wraps the [Firebase JS SDK](https://github.com/firebase/firebase-js-sdk) in a way that lets you provide a set of types describing your data so you can prevent bugs, errors and crashes at compile time. It remembers the "schema" that you feed to it and stops you from writing bad code. This, combined with the ease with which it lets you bring changes to your codebase, provides a great developer experience.

<p>
    <a href="https://npmjs.com/package/@firetype/client" alt="Version">
        <img src="https://img.shields.io/npm/v/@firetype/client" /></a>
    <a href="https://npmjs.com/package/@firetype/client" alt="Size">
        <img src="https://img.shields.io/bundlephobia/min/@firetype/client" /></a>
    <a href="https://" alt="Types">
        <img src="https://img.shields.io/npm/types/@firetype/client" /></a>  
    <a href="https://" alt="Last Commit">
        <img src="https://img.shields.io/github/last-commit/kafkas/firetype" /></a>
    <a href="https://npmjs.com/package/@firetype/client" alt="Downloads">
        <img src="https://img.shields.io/npm/dm/@firetype/client" /></a>
</p>

## Installation

If you haven't already installed `firebase`, run

```
npm install firebase
```

Then,

```
npm install @firetype/client
```

## Quick Start

Consider a simple `emails` collection that needs to be typed. The first thing we need to do is to create an interface that describes an email doc in this collection. Create a new file (perhaps `services/firestore.ts`) where you'll add all this information.

```ts
import type { firestore } from 'firebase';

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
  readonlyFields: {
    sentAt: true;
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

We now have one final task, which is to create our Firestore **describer** that consists of one **collection describer**. A collection describer is an object that contains details such as model converters and subcollection describers (see [`FTCollectionDescriber`](src/FTCollectionDescriber.ts))

```ts
import type { FTFirestoreDescriber } from '@firetype/client';

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
          // `sentAt` is readonly for clients so we'll get a TS error if we add it here
        }),
        setMerge: email =>
          removeUndefinedFields({
            from: email.from,
            to: email.to,
            subject: email.subject,
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
import { FTFirestore } from '@firetype/client';

export const Firestore = new FTFirestore<FirestoreModel>(describer);
```

Putting everything together we have the following

```ts
import type { firestore } from 'firebase';
import { FTFirestore, FTFirestoreDescriber } from '@firetype/client';

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
  readonlyFields: {
    sentAt: true;
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
          // `sentAt` is readonly for clients so we'll get a TS error if we add it here
        }),
        setMerge: email =>
          removeUndefinedFields({
            from: email.from,
            to: email.to,
            subject: email.subject,
          }),
      },
    },
  },
};

export const Firestore = new FTFirestore<FirestoreModel>(describer);
```

That's it! You can now use your well-typed `FTFirestore` instance to securely edit your Firestore documents and collections. While Firetype lets you strictly type your architecture, it also provides an easy way to escape strict typing. Every Firetype object that you'll be interacting with has a `.core` property which gives you access to the underlying Firebase object which is loosely typed. This is particularly useful if you're planning to migrate to Firetype over a period of time.

## Examples

Below are a several examples that show the difference between using Firetype and raw Firebase objects.

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
import { FTFieldValue } from '@firetype/client';

// Without Firetype
firestore()
  .collection('emails')
  .doc('email_id')
  .update({
    aNonExistentField: '123', // OK
    isSaved: new Date(), // OK
    lastModifiedAt: [1, 2, 3], // OK
    anOptionalField: firestore.FieldValue.delete(), // OK
    aReadonlyField: 'some_value', // OK but you'll get an "Insufficient Permissions" error at runtime
  });

// With Firetype
Firestore.collection('emails')
  .doc('email_id')
  .update({
    aNonExistentField: '123', // TS Error: Field does not exist.
    isSaved: new Date(), // TS Error: Must be a boolean.
    lastModifiedAt: [1, 2, 3], // TS Error: Must be Date or firestore.Timestamp or FTFieldValueServerTimestamp
    anOptionalField: FTFieldValue.delete(), // OK
    aReadonlyField: 'some_value', // TS Error: Field is read-only for clients
  });
```

## API

### [FTCollectionModel](../core/src/FTCollectionModel.ts)

Represents the data model for a specific collection and its subcollections. You don't need to import `FTCollectionModel` and use it in your code. Instead you need to make sure that your collection models have the same shape as `FTCollectionModel`.

#### Properties:

- `model`: Contains the raw and processed models.
  - `raw`: The shape of the documents belonging to this collection.
  - `processed`: The processed model. You can make this
- `readonlyFields` (optional): An object type whose keys are the field names in the raw model that are read-only for clients and values are `true`. You can mark fields as read-only in Firestore Security rules.
- `sub` (optional): Contains the collection models for all subcollections keyed by their actual keys on Firestore.

#### Definition:

```ts
interface FTCollectionModel {
  model: {
    raw: FTDocumentData;
    processed: unknown;
  };
  readonlyFields?: {
    [field: string]: true;
  };
  sub?: {
    [collectionKey: string]: FTCollectionModel;
  };
}
```

### [FTFirestoreModel](../core/src/FTFirestoreModel.ts)

Represents the data model for the entire Firestore database. As with `FTCollectionModel` you don't need to import `FTFirestoreModel` and use it in your code. Instead you need to make sure that your Firestore model has the same shape as `FTFirestoreModel`.

#### Properties:

A key for each collection at the root level, with each key mapped to a `FTCollectionModel`.

#### Definition:

```ts
interface FTFirestoreModel {
  [collectionKey: string]: FTCollectionModel;
}
```