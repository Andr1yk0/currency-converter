import {defer} from "rxjs";

//https://stackoverflow.com/a/52959047
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
