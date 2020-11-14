import { firestore } from 'firebase-admin';
import type { FTCollectionDescriber } from '../../../src';
import { removeUndefinedFields } from '../../utils';

export type UserDoc = {
  firstName?: string;
  username: string;
  birthDate: firestore.Timestamp | null;
  lastLocation?: firestore.GeoPoint;
  createdAt: firestore.Timestamp;
};

export class User {
  public firstName?: string;
  public username: string;
  public birthDate: Date | null;
  public lastLocation?: { lat: number; lng: number };
  public createdAt: Date;

  constructor(public readonly id: string, { firstName, username, birthDate, lastLocation, createdAt }: UserDoc) {
    this.firstName = firstName;
    this.username = username;
    this.birthDate = birthDate?.toDate() ?? null;
    this.lastLocation = lastLocation
      ? {
          lat: lastLocation.latitude,
          lng: lastLocation.longitude,
        }
      : undefined;
    this.createdAt = createdAt.toDate();
  }
}

export type UsersCollectionModel = {
  model: {
    raw: UserDoc;
    processed: User;
  };
  readonlyFields: {
    username: true;
    createdAt: true;
  };
};

export const usersDescriber: FTCollectionDescriber<UsersCollectionModel> = {
  converter: {
    toFirestore: {
      set: user => {
        return removeUndefinedFields({
          firstName: user.firstName,
          username: user.username,
          birthDate: user.birthDate ?? null,
          lastLocation: user.lastLocation
            ? new firestore.GeoPoint(user.lastLocation.lat, user.lastLocation.lng)
            : undefined,
          createdAt: user.createdAt,
        });
      },
      setMerge: partialUser => {
        return removeUndefinedFields({
          firstName: partialUser.firstName,
          username: partialUser.username,
          birthDate: partialUser.birthDate ?? null,
          lastLocation: partialUser.lastLocation
            ? new firestore.GeoPoint(partialUser.lastLocation.lat, partialUser.lastLocation.lng)
            : undefined,
          createdAt: partialUser.createdAt,
        });
      },
    },
    fromFirestore: userDocSnapshot => {
      return new User(userDocSnapshot.id, userDocSnapshot.data());
    },
  },
};
