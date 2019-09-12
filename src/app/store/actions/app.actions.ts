import {createAction, props} from "@ngrx/store";

export const setError = createAction(
  '[App] Set Error',
  props<{error: string}>()
);

export const deleteError = createAction(
  '[App] Delete Error',
);


