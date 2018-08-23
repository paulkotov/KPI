export const addData = data => ({ type: 'ADD_PLAN_DATA', payload: data });
export const delData = () => ({ type: 'DEL_PLAN_DATA' });
export const editData = (id, data) => ({ type: 'EDIT_PLAN_DATA', payload: { id, data } });