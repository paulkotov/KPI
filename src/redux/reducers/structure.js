const defaultState = {
  isDataLoading: true,
  data: []
};
  
export default function structure(state = defaultState, action) {
  switch (action.type) {
    case 'DATA_LOADING':
      return {
        ...state,
        isDataLoading: true
      };
  
    case 'DATA_LOADED':
      return {
        ...state,
        isDataLoading: false
      };
  
    case 'GET_STRUCT_DATA':
      return state;
  
    case 'ADD_STRUCT_DATA':
      return {
        ...state,
        data: action.payload
      };
  
    default:
      return state;
  }
}
  
export let data = defaultState.data;