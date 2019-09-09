import {Action} from "@ngrx/store";

export enum EGraphActions {
  SetData = '[Graph] Set Data',
}

export class SetData implements Action{
  public readonly type = EGraphActions.SetData;

  constructor(public payload: Array<any>){
  }
}

export type GraphActions = SetData;
