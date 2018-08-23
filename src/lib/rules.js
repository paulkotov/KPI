import _ from 'lodash';
let rulesList = [];

function rules(data){
  if (typeof data !== 'object') {
    return rulesList;
  }
  data.map( item => {
    let newItem = { id: item.id, name: item.name };
    rulesList.push(newItem);
    if (item.children !== 'undefined'){
      rules(item.children);
    }
  });
  // return rulesList;
}

export function setRules(data){
  rules(data);
  return _.uniqWith(rulesList, _.isEqual);
}