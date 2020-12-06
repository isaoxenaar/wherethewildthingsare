const initialState = { list: [] };

export default function exe1Reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHED_EXPEDITIONS": {
      return {
        ...state,
        list: action.payload,
      };
    }
    default:
      return state;
  }
}
