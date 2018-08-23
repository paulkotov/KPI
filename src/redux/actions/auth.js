import { createAction } from 'redux-actions';

// export const login = profile => ({ type: 'LOGIN', payload: profile });
// export const getCurrentUser = () => ({ type: 'GET_CURRENT_USER' });
// export const logout = () => ({ type: 'LOGOUT' });

export const login  = createAction('LOGIN', profile => profile);
export const getCurrentUser = createAction('GET_CURRENT_USER');
export const logout = createAction('LOGOUT');