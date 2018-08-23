const defaultState = {
  isLoading: false,
  data: []
};

export default function plan(state = defaultState, action) {
  switch (action.type) {
    case 'GET_PLAN_DATA':
      return state;

    case 'ADD_PLAN_DATA':
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
}

export let data = defaultState.data;