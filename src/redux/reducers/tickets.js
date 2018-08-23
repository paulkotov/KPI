const defaultState = {
  data: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_ALL_TICKETS_RES':
      return { ...state, data: action.payload };
    case 'GET_ALL_TICKETS_REQ':
    case 'GET_ALL_TICKETS_FAIL':
      return { ...state };
    default:
      return state;
  }
};