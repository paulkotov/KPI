export const addData = data => ({ type: 'ADD_STRUCT_DATA', payload: data });
export const delData = () => ({ type: 'DEL_STRUCT_DATA' });
export const editData = (id, data) => ({ type: 'EDIT_STRUCT_DATA', payload: { id, data } });