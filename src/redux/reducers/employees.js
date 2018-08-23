export const defaultState = {
  dataLoaded: false,
  data : [{
    id: 1,
    key: 1,
    dir: 'Аппарат управления',
    pos: 'Генеральный директор',
    empl: 'ФИО 4135',
    t_id: '012885',
    date1: '24/12/2014',
    date2: '24/12/2014',
    date3: '24/12/2014',
    param1: 1,
    text: 'text'
  }, {
    id: 2,
    key: 2,
    dir: 'Аппарат управления',
    pos: 'Главный бухгалтер',
    empl: 'ФИО 4134',
    t_id: '012885',
    date1: '11/01/2015',
    date2: '11/01/2015',
    date3: '11/01/2015',
    param1: 1,
    text: 'text'
  }, {
    id: 3,
    key: 3,
    dir: 'Аппарат управления',
    pos: 'Главный бухгалтер',
    empl: 'ФИО 4134',
    t_id: '012885',
    date1: '01/08/2015',
    date2: '01/08/2015',
    date3: '01/08/2015',
    param1: 1,
    text: 'text'
  }]
};

export default function employees(state=defaultState, action){
  switch (action.type) {
    case 'DATA_LOADING':
      return {
        ...state,
        isDataLoading: true
      };

    case 'DATA_LOADED':
      return {
        ...state,
        isDataLoading: false
      };

    case 'GET_USERS_DATA':
      return state;
    
    case 'SET_USERS_DATA':
      return { ...state, data: action.payload  };
    
    default:
      return state;
  }
}

export let data = defaultState.data;