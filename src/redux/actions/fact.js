export const addData = data => ({ type: 'ADD_FACT_DATA', payload: data });
export const delData = () => ({ type: 'DEL_FACT_DATA' });
export const editData = (id, data) => ({ type: 'EDIT_FACT_DATA', payload: { id, data } });