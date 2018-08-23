const defaultState = {
  isDataLoading: true,
  data: [{
    id: 1,
    key: '1',
    pod: 'Отдел логистики',
    pos: 'Юрист',
    empl: 'Анисенко Андрей Михайлович',
    item1: '',
    ves: 75,
    fact01: 0.1,
    fact02: 0.1,
    fact03: 0.1,
    kv1: 1,
    fact04: 0.1,
    fact05: 0.1,
    fact06: 0.1,
    kv2: 1,
    fact07: 0.1,
    fact08: 0.1,
    fact09: 0.1,
    kv3: 1,
    fact10: 0.1,
    fact11: 0.1,
    fact12: 0.1,
    kv4: 1,
    year: 1
  }, {
    id: 1,
    key: '2',
    pod: 'Отдел логистики',
    pos: 'Юрист',
    empl: 'Анисенко Андрей Михайлович',
    item1: '',
    ves: 75,
    fact01: 0.1,
    fact02: 0.1,
    fact03: 0.1,
    kv1: 1,
    fact04: 0.1,
    fact05: 0.1,
    fact06: 0.1,
    kv2: 1,
    fact07: 0.1,
    fact08: 0.1,
    fact09: 0.1,
    kv3: 1,
    fact10: 0.1,
    fact11: 0.1,
    fact12: 0.1,
    kv4: 1,
    year: 1
  }]
};

export default function fact(state = defaultState, action) {
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