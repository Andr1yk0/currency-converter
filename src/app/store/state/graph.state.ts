export interface GraphState {
  ratesHistory: Object,
  dateFrom: string,
  dateTo: string
}

export const initialGraphState: GraphState = {
  ratesHistory: null,
  dateFrom: null,
  dateTo: null
};
