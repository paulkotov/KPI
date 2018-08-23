const defaultState = {
  isDataLoading: true,
  data: [
    {
      key: '1',
      number: 1,
      kpe: 'Объем просроченой дебиторской задолжности',
      id: 1,
      desc: 'Методика расчета',
      ed: '%',
      group: 'Общие',
      type: 'Ежемесячный',
      trend: 'Вверх',
      count: 'План/Факт',
      k: '1'
    }, {
      key: '2',
      number: 2,
      kpe: '% полученной в досудебном порядке пени по отделению',
      id: 2,
      desc: 'Методика расчета',
      ed: '%',
      group: 'Общие',
      type: 'Ежемесячный',
      trend: 'Вверх',
      count: 'План/Факт',
      k: '1'
    }, {
      key: '3',
      number: 3,
      kpe: 'Соблюдение отчетной и исполнительской дисциплины',
      id: 3,
      desc: 'Методика расчета',
      ed: '%',
      group: 'Общие',
      type: 'Ежемесячный',
      trend: 'Вверх',
      count: 'План/Факт',
      k: '1'
    }
  ]
};

export default function indexes(state = defaultState, action) {
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

    case 'GET_FACT_DATA':
      return state;

    case 'SET_FACT_DATA':
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
}

export let data = defaultState.data;