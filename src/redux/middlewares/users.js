const ADD_USER = 'ADD_USER';
const DEL_USER = 'DEL_USER';

const usersMiddleware = () => next => action => {
  switch (action.type) {
    case ADD_USER:
      if (action.result) {
        localStorage.setItem( 'storedState', JSON.stringify(action.result) );
      }
      break;
      
    case DEL_USER:
      localStorage.removeItem( 'storedState' );
      break;

    default:
      return next(action);
  }

  return next(action);
};

export default usersMiddleware;