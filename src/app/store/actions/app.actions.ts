import {Action} from "@ngrx/store";

export enum EAppActions {
  SetError = '[App] Set Error',
  DeleteError = '[App] Delete Error'
}

export class SetError implements Action{
  public readonly type = EAppActions.SetError;

  constructor(public payload: string){
  }
}

export class DeleteError {
  public readonly type = EAppActions.DeleteError;
}

export type AppActions = SetError | DeleteError;
