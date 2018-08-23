export const addData = data => ({ type: 'ADD_EMPLOYEES_DATA', payload: data });
export const delData = () => ({ type: 'DEL_EMPLOYEES_DATA' });
export const editData = (id, data) => ({ type: 'EDIT_EMPLOYEES_DATA', payload: { id, data } });