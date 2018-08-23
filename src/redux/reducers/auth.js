import { handleActions } from 'redux-actions';
// import { login, logout } from '../actions/auth';

const auth = handleActions({
  LOGIN: (state, action) => ({
    user: action.payload ? action.payload : null
  }),
  LOGOUT: () => ({
    user: null
  }),
  GET_CURRENT_USER: state => ({
    user: state.user
  })
}, { user: null });

export default auth;

// const defaultState = {
//   user: null,
// };

// const authLogin = handleAction(
//   'LOGIN',
//   (state, action) => ({
//     ...state, user: action.payload ? action.payload : defaultState.user
//   }), 
//   defaultState
// );

// const authLogout = handleAction(
//   'LOGOUT',
//   (state, action) => ({
//     ...state, user: null 
//   }),
//   defaultState
// );


// export default function auth (state=defaultState, action){
//   switch (action.type){
//     case 'LOGIN':
//       return { ...state, user: action.payload ? action.payload : defaultState.user };
//     case 'LOGOUT':
//       return { ...state, user: null };
    
//     case 'GET_CURRENT_USER':
//       return state;
    
//     default:
//       return state;
//   }
// }