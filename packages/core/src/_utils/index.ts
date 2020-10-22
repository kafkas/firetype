/**
 * A subset of T matching condition C.
 */
export type Subset<T, C> = Pick<T, FieldsMatchingCondition<T, C>>;

type FieldsMatchingCondition<T, C> = MarkedFields<T, C>[keyof T];
type MarkedFields<T, C> = {
  [K in keyof T]: T[K] extends C ? K : never;
};
