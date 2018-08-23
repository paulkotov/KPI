export const addData = data => ({ type: 'ADD_INDEXES_DATA', payload: data });
export const delData = () => ({ type: 'DEL_INDEXES_DATA' });
export const editData = (id, data) => ({ type: 'EDIT_INDEXES_DATA', payload: { id, data } });