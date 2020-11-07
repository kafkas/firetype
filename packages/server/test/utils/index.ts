export const objectKeys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];

export function removeUndefinedFields<T extends object>(obj: T): T {
  objectKeys(obj).forEach(key => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}
