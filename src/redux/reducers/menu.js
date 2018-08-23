const defaultState = {
  item: '1',
};
  
export default function menu (state=defaultState, action){
  switch (action.type){
    case 'CHANGE_MENU':
      return { item: action.menu };
    default:
      return state;
  }
}