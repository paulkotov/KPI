import { createAction } from 'redux-actions';

// export const changeMenu = menu => ({ type: 'CHANGE_MENU', menu });

export const changeMenu = createAction('CHANGE_MENU', item => item);
