const defaultState = {
  tickets: false,
};

export default function (state=defaultState, action){
  switch (action.type){
    case 'GET_ALL_TICKETS_REQ':
      return { ...state, tickets: true };
    case 'GET_ALL_TICKETS_RES':
    case 'GET_ALL_TICKETS_FAIL':
      return { ...state, tickets: false };
    default:
      return state;
  }
}