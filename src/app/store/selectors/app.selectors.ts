import {AppState} from "../state/app.state";

export const selectError = (state: AppState) => state.error;
