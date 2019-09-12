import {createAction, props} from "@ngrx/store";

export const loadHistory = createAction(
  '[Graph] Load History'
);

export const setRatesHistory = createAction(
  '[Graph] Set Rates History',
  props<{history:Object}>()
);

export const setDateFrom = createAction(
  '[Graph] Set Date From',
  props<{ date: string}>()
);

export const setDateTo = createAction(
  '[Graph] Set Date To',
  props<{ date: string}>()
);
