import { handleActions } from 'redux-actions';

const defaultState = {
  dataLoading: true,
  data: []
};

// export default function users (state = defaultState, action) {
//   switch (action.type) {
//     case 'GET_USERS_DATA':
//       return state;
  
//     case 'ADD_USERS_DATA':
//       return { ...state, data: action.payload  };
  
//     default:
//       return state;
//   }
// }

const users = handleActions({
  ADD_USERS_DATA: (state, action) => ({
    ...state, data: action.payload ? action.payload : null
  }),
  GET_USERS_DATA: state => ({
    ...state
  })
}, defaultState);

export default users;
export let data = defaultState.data;