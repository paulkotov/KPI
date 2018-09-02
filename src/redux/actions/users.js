import { createAction } from 'redux-actions';

// export const addData = data => ({ type: 'ADD_USERS_DATA', payload: data });
// export const delData = () => ({ type: 'DEL_USERS_DATA' });
export const editData = (id, data) => ({ type: 'EDIT_USERS_DATA', payload: { id, data } });

export const addData = createAction('ADD_USERS_DATA', data => data);
export const getData = createAction('GET_USERS_DATA');
export const delData = createAction('DEL_USERS_DATA');