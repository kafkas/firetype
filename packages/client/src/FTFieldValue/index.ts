import { Delete } from './Delete';
import { ServerTimestamp } from './ServerTimestamp';
import { ArrayUnion } from './ArrayUnion';
import { ArrayRemove } from './ArrayRemove';
import { Increment } from './Increment';
import { Decrement } from './Decrement';

export interface FTFieldValue {
  toFirestore(): firebase.firestore.FieldValue;
}

export class FTFieldValue {
  public static Delete = Delete;
  public static ServerTimestamp = ServerTimestamp;
  public static ArrayUnion = ArrayUnion;
  public static ArrayRemove = ArrayRemove;
  public static Increment = Increment;
  public static Decrement = Decrement;

  public static delete() {
    return new Delete();
  }

  public static serverTimestamp() {
    return new ServerTimestamp();
  }

  public static arrayUnion<T>(...elements: T[]) {
    return new ArrayUnion(...elements);
  }

  public static arrayRemove<T>(...elements: T[]) {
    return new ArrayRemove(...elements);
  }

  public static increment(n: number) {
    return new Increment(n);
  }

  public static decrement(n: number) {
    return new Decrement(n);
  }
}
